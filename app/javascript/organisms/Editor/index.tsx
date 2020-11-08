import React, { forwardRef, RefObject, useMemo } from 'react';
import { Editor as DraftEditor, EditorState } from 'draft-js';
import classNames from 'clsx';
import Context from './context';
import EditorToolbar from './EditorToolbar';
import InsertionPoint from './InsertionPoint';
import useDragDrop from './useDragDrop';
import useKeyBindings from './useKeyBindings';
import useBlockRenderer from './useBlockRenderer';
import STYLE_MAP from './styleMap';

import 'draft-js/dist/Draft.css';
import './index.scss';

interface EditorProps {
  state: EditorState;
  onChange(value: EditorState): void;
}

const Editor = forwardRef(({ state, onChange }: EditorProps, ref: RefObject<DraftEditor>) => {
  const { dropPosition, dragOver, drop, dragEnd } = useDragDrop(state, onChange);

  const { keyBindingFn, handleKeyCommand } = useKeyBindings(state, onChange);

  const blockRendererFn = useBlockRenderer();

  const context = useMemo(() => ({ state, onChange }), [state, onChange]);

  return (
    <Context.Provider value={context}>
      <div
        className={classNames('editor', dropPosition && 'editor--dragging')}
        onDragOver={dragOver}
        onDrop={drop}
        onDragEnd={dragEnd}
      >
        <DraftEditor
          ref={ref}
          editorState={state}
          customStyleMap={STYLE_MAP}
          blockRendererFn={blockRendererFn}
          keyBindingFn={keyBindingFn}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
        />
        {dropPosition && <InsertionPoint {...dropPosition} />}
        <EditorToolbar state={state} onChange={onChange} />
      </div>
    </Context.Provider>
  );
});

Editor.displayName = 'Editor';

export default Editor;
