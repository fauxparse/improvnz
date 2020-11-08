import React, { useCallback, useEffect, useRef } from 'react';
import { AtomicBlockUtils, EditorState, SelectionState } from 'draft-js';
import Button from '../../atoms/Button';

interface Props {
  state: EditorState;
  blockKey: string;
  onChange(value: EditorState): void;
}

const BlockHandle: React.FC<Props> = ({ blockKey, state, onChange }) => {
  const ref = useRef<HTMLDivElement>();

  const updatePosition = useCallback(() => {
    if (ref.current) {
      const block: HTMLElement = ref.current
        .closest('.editor')
        .querySelector(`[data-block][data-offset-key^="${blockKey}"]`);
      ref.current.style.transform = `translateY(${block.offsetTop - 4}px)`;
    }
  }, [blockKey]);

  useEffect(updatePosition, [updatePosition, state]);

  useEffect(() => {
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [updatePosition]);

  const dragStart = useCallback(
    (e) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('application/editor-block', blockKey);
      e.dataTransfer.setDragImage(new Image(), 0, 0);
    },
    [blockKey]
  );

  const insertImage = useCallback(
    (e) => {
      e.preventDefault();
      const src = 'https://via.placeholder.com/1920x1080';
      const content = state.getCurrentContent();
      const contentStateWithEntity = content.createEntity('image', 'IMMUTABLE', { src });
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const block = content.getBlockForKey(blockKey);
      const nextBlock = content.getBlockAfter(blockKey);
      const selection = SelectionState.createEmpty(blockKey).merge({
        anchorOffset: block.getLength(),
        focusKey: nextBlock ? nextBlock.getKey() : blockKey,
        focusOffset: nextBlock ? 0 : block.getLength(),
      });
      const newState = EditorState.set(state, {
        currentContent: contentStateWithEntity,
        selection,
      });
      onChange(AtomicBlockUtils.insertAtomicBlock(newState, entityKey, ' '));
    },
    [state, onChange, blockKey]
  );

  return (
    <div ref={ref} className="block-handle editor__block-handle">
      <Button
        className="block-handle__insert"
        toolbar
        icon="plus"
        aria-label="Insert content below"
        onClick={insertImage}
      />
      <Button
        className="block-handle__drag"
        toolbar
        icon="drag"
        aria-label="Drag to move block; click for options"
        draggable
        onDragStart={dragStart}
      />
    </div>
  );
};

export default BlockHandle;
