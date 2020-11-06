import React, { forwardRef, RefObject, useCallback } from 'react';
import {
  Editor as DraftEditor,
  DraftHandleValue,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
} from 'draft-js';
import EditorToolbar from './EditorToolbar';

import 'draft-js/dist/Draft.css';
import './index.scss';

interface EditorProps {
  state: EditorState;
  onChange(value: EditorState): void;
}

const styleMap = {
  BOLD: {
    fontWeight: 600,
  },
  CODE: {
    fontFamily: 'Operator Mono, monospace',
  },
};

const Editor = forwardRef(({ state, onChange }: EditorProps, ref: RefObject<DraftEditor>) => {
  const changed = useCallback(
    (newState) => {
      onChange(newState);
    },
    [onChange]
  );

  const keyBindingFunction = useCallback(
    (e) => {
      if (e.key === 'Tab') {
        const newState = RichUtils.onTab(e, state, 6);
        if (newState !== state) {
          e.preventDefault();
          changed(newState);
        }
        return;
      }
      return getDefaultKeyBinding(e);
    },
    [state, changed]
  );

  const handleKeyCommand = useCallback(
    (command: string): DraftHandleValue => {
      const newState = RichUtils.handleKeyCommand(state, command);
      if (newState) {
        onChange(newState);
        return 'handled';
      }
      console.log(command);
      return 'not-handled';
    },
    [state, onChange]
  );

  return (
    <>
      <DraftEditor
        ref={ref}
        editorState={state}
        customStyleMap={styleMap}
        keyBindingFn={keyBindingFunction}
        handleKeyCommand={handleKeyCommand}
        onChange={changed}
      />
      <EditorToolbar state={state} onChange={changed} />
    </>
  );
});

Editor.displayName = 'Editor';

export default Editor;
