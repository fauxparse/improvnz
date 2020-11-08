import React, { forwardRef, RefObject } from 'react';
import { Editor as DraftEditor, EditorState } from 'draft-js';
import classNames from 'clsx';
import EditorToolbar from './EditorToolbar';
import Gutter from './Gutter';
import InsertionPoint from './InsertionPoint';
import useDragDrop from './useDragDrop';
import useKeyBindings from './useKeyBindings';
import blockRendererFn from './blockRenderer';
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

  return (
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
      <Gutter state={state} onChange={onChange} />
      {dropPosition && <InsertionPoint {...dropPosition} />}
      <EditorToolbar state={state} onChange={onChange} />
    </div>
  );
});

Editor.displayName = 'Editor';

export default Editor;
