import React, { useCallback, useContext, useRef } from 'react';
import { AtomicBlockUtils, ContentBlock, EditorState, SelectionState } from 'draft-js';
import Button from '../../atoms/Button';
import Context from './context';

interface Props {
  block: ContentBlock;
  onDragStart?(): void;
}

const BlockHandle: React.FC<Props> = ({ block, onDragStart }) => {
  const ref = useRef<HTMLDivElement>();

  const key = block.getKey();

  const { state, onChange } = useContext(Context);

  const dragStart = useCallback(
    (e) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('application/editor-block', key);
      e.dataTransfer.setDragImage(new Image(), 0, 0);
      if (onDragStart) onDragStart();
    },
    [key, onDragStart]
  );

  const insertImage = useCallback(
    (e) => {
      e.preventDefault();
      const src = 'https://via.placeholder.com/1920x1080';
      const content = state.getCurrentContent();
      const contentStateWithEntity = content.createEntity('image', 'IMMUTABLE', { src });
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const nextBlock = content.getBlockAfter(key);
      const selection = SelectionState.createEmpty(key).merge({
        anchorOffset: block.getLength(),
        focusKey: nextBlock ? nextBlock.getKey() : key,
        focusOffset: nextBlock ? 0 : block.getLength(),
      });
      const newState = EditorState.set(state, {
        currentContent: contentStateWithEntity,
        selection,
      });
      onChange(AtomicBlockUtils.insertAtomicBlock(newState, entityKey, ' '));
    },
    [state, onChange, block, key]
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
