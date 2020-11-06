import React, { useCallback, useEffect, useRef } from 'react';
import { EditorState } from 'draft-js';
import Button from '../../atoms/Button';

interface Props {
  state: EditorState;
  blockKey: string;
  onChange(value: EditorState): void;
}

const BlockHandle: React.FC<Props> = ({ blockKey, state }) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const block: HTMLElement = ref.current
      .closest('.editor')
      .querySelector(`[data-block][data-offset-key^="${blockKey}"]`);
    ref.current.style.transform = `translateY(${block.offsetTop - 4}px)`;
  }, [blockKey, state]);

  const dragStart = useCallback(
    (e) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('application/editor-block', blockKey);
      e.dataTransfer.setDragImage(new Image(), 0, 0);
    },
    [blockKey]
  );

  return (
    <div ref={ref} className="block-handle editor__block-handle">
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
