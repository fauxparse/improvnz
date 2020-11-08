import React, { useCallback, useContext, useRef } from 'react';
import { ContentBlock, SelectionState } from 'draft-js';
import Button from '../../atoms/Button';
import Context from './context';
import { BLOCK_MIME_TYPE } from './useDragDrop';
import insertImage from './insertImage';

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
      e.dataTransfer.setData(BLOCK_MIME_TYPE, key);
      e.dataTransfer.setDragImage(new Image(), 0, 0);
      if (onDragStart) onDragStart();
    },
    [key, onDragStart]
  );

  const insertImageClicked = useCallback(
    (e) => {
      e.preventDefault();
      const src = 'https://via.placeholder.com/1920x1080';
      const content = state.getCurrentContent();
      const selection = SelectionState.createEmpty(key).merge({
        anchorOffset: block.getLength(),
        focusOffset: block.getLength(),
      });
      onChange(insertImage(state, selection, [src]));
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
        onClick={insertImageClicked}
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
