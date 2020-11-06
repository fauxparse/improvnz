import { useState, useCallback, useEffect } from 'react';
import { EditorState, AtomicBlockUtils, SelectionState } from 'draft-js';
import { DropPosition } from './InsertionPoint';

type UseDragDropHook = (
  state: EditorState,
  onChange: (EditorState) => void
) => {
  dropPosition: DropPosition;
  dragOver: (DragEvent) => void;
  drop: (DragEvent) => void;
  dragEnd: (dragEvent) => void;
};

const useDragDrop: UseDragDropHook = (state: EditorState, onChange: (EditorState) => void) => {
  const [dropPosition, setDropPosition] = useState<DropPosition>();

  const dragOver = useCallback(
    (e) => {
      if (e.dataTransfer.types.includes('application/editor-block')) {
        const block = document
          .elementsFromPoint(e.clientX, e.clientY)
          .find((el) => el.hasAttribute('data-block')) as HTMLElement;
        e.dataTransfer.dropEffect = 'move';

        if (block) {
          const { top, height } = block.getBoundingClientRect();
          const insert = e.clientY < top + height / 3 ? 'before' : 'after';
          if (!dropPosition || block !== dropPosition.block || insert !== dropPosition.insert) {
            setDropPosition({ block, insert });
          }
          e.preventDefault();
        } else if (dropPosition) {
          setDropPosition(null);
        }
      }
    },
    [dropPosition]
  );

  const drop = useCallback(
    (e) => {
      const key = e.dataTransfer.getData('application/editor-block');
      if (key) {
        const target = dropPosition.block.dataset.offsetKey.split('-')[0];
        if (key !== target) {
          const block = state.getCurrentContent().getBlockForKey(key);
          const selection = SelectionState.createEmpty(target);

          try {
            const newState = AtomicBlockUtils.moveAtomicBlock(
              state,
              block,
              selection,
              dropPosition.insert
            );
            onChange(newState);
          } catch (e) {
            if (e.name !== 'Invariant Violation') throw e;
          }
        }
      }
    },
    [state, onChange, dropPosition]
  );

  const dragEnd = useCallback(() => {
    setDropPosition(null);
    onChange(EditorState.moveFocusToEnd(state));
  }, [state, onChange]);

  useEffect(() => setDropPosition(null), [state]);

  return {
    dropPosition,
    dragOver,
    drop,
    dragEnd,
  };
};

export default useDragDrop;
