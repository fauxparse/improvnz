import React, { useCallback, useRef, useState } from 'react';
import classNames from 'clsx';
import { ContentBlock, ContentState, EditorBlock as DraftEditorBlock } from 'draft-js';
import MediaBlock from './MediaBlock';
import BlockHandle from './BlockHandle';

interface EditorBlockProps {
  block: ContentBlock;
  contentState: ContentState;
}

const BLOCK_COMPONENTS = {
  atomic: MediaBlock,
};

const EditorBlock: React.FC<EditorBlockProps> = ({ block, contentState, ...props }) => {
  const ref = useRef<HTMLDivElement>();

  const type = block.getType();

  const key = block.getKey();

  const [dragging, setDragging] = useState(false);

  const BlockComponent = BLOCK_COMPONENTS[type] || DraftEditorBlock;

  const stopDragging = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const startDragging = useCallback(() => {
    setDragging(true);
    ref.current.closest('.editor').addEventListener('dragend', stopDragging, { once: true });
  }, [setDragging, stopDragging]);

  return (
    <div
      ref={ref}
      className={classNames('editor__block', dragging && 'editor__block--dragging')}
      data-block-key={key}
    >
      <BlockHandle block={block} onDragStart={startDragging} />
      <BlockComponent block={block} contentState={contentState} {...props} />
    </div>
  );
};

export default EditorBlock;
