import { useState, useCallback, useEffect } from 'react';
import { EditorState, AtomicBlockUtils, SelectionState } from 'draft-js';
import { DropPosition } from './InsertionPoint';
import insertImage from './insertImage';

export const BLOCK_MIME_TYPE = 'application/editor-block';

type UseDragDropHook = (
  state: EditorState,
  onChange: (EditorState) => void
) => {
  dropPosition: DropPosition;
  dragOver: (DragEvent) => void;
  drop: (DragEvent) => void;
  dragEnd: (dragEvent) => void;
};

const canDrop = (event: DragEvent): boolean => {
  const { types } = event.dataTransfer;
  return types.includes(BLOCK_MIME_TYPE) || types.includes('Files');
};

const useDragDrop: UseDragDropHook = (state: EditorState, onChange: (EditorState) => void) => {
  const [dropPosition, setDropPosition] = useState<DropPosition>();

  const dragOver = useCallback(
    (e) => {
      if (canDrop(e)) {
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
      const { types, files } = e.dataTransfer;
      const { insert } = dropPosition;
      const content = state.getCurrentContent();
      const target = dropPosition.block.dataset.offsetKey.split('-')[0];
      const block = content.getBlockForKey(target);
      const anchorOffset = insert === 'before' ? 0 : block.getLength();
      const focusKey = (insert === 'after' && content.getKeyAfter(target)) || target;
      const selection = SelectionState.createEmpty(target).merge({
        anchorOffset,
        focusKey,
        focusOffset: focusKey === target ? anchorOffset : 0,
      });

      if (types.includes(BLOCK_MIME_TYPE)) {
        const key = e.dataTransfer.getData(BLOCK_MIME_TYPE);
        if (key) {
          if (key !== target) {
            const block = state.getCurrentContent().getBlockForKey(key);

            try {
              const newState = AtomicBlockUtils.moveAtomicBlock(state, block, selection, insert);
              onChange(newState);
            } catch (e) {
              if (e.name !== 'Invariant Violation') throw e;
            }
          }
        }
      } else if (types.includes('Files')) {
        const promises = Array.from(files).reduce(
          (result: Promise<string>[], file: File) =>
            /^image\//.test(file.type)
              ? result.concat([
                  new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = ({ target: { result: url } }) => resolve(String(url));
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                  }),
                ])
              : result,
          []
        ) as Promise<string>[];

        Promise.all(promises).then((urls) => {
          onChange(insertImage(state, selection, urls));
        });
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
