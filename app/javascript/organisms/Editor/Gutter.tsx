import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { EditorState } from 'draft-js';
import BlockHandle from './BlockHandle';

interface GutterProps {
  state: EditorState;
  onChange(value: EditorState): void;
}

const Gutter: React.FC<GutterProps> = ({ state, onChange }) => {
  const ref = useRef<HTMLDivElement>();

  const [key, setKey] = useState<string | null>();

  const blockEntered = useCallback((e) => {
    const closestBlock: HTMLElement | null = (e.target as HTMLElement).closest('[data-block]');
    if (closestBlock) {
      setKey(closestBlock.dataset.offsetKey.split('-')[0]);
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      const editor = ref.current.closest('.editor');
      if (editor) {
        editor.addEventListener('mouseover', blockEntered);
        return () => editor.removeEventListener('mouseover', blockEntered);
      }
    }
  }, [blockEntered]);

  return (
    <div ref={ref} className="editor__gutter">
      <TransitionGroup component={null}>
        {key && (
          <CSSTransition key={key} timeout={300} classNames="editor__block-handle-">
            <BlockHandle state={state} blockKey={key} onChange={onChange} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default Gutter;
