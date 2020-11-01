import React, { forwardRef, RefObject, useCallback } from 'react';
import { Editor as DraftEditor, DraftHandleValue, EditorState, RichUtils } from 'draft-js';
import Toolbar from './Toolbar';

import 'draft-js/dist/Draft.css';
import './index.scss';

interface EditorProps {
  value: EditorState;
  onChange(value: EditorState): void;
}

const Editor = forwardRef(({ value, onChange }: EditorProps, ref: RefObject<DraftEditor>) => {
  const handleKeyCommand = useCallback(
    (command: string): DraftHandleValue => {
      const newState = RichUtils.handleKeyCommand(value, command);
      if (newState) {
        onChange(newState);
        return 'handled';
      }
      console.log(command);
      return 'not-handled';
    },
    [value, onChange]
  );

  const changed = useCallback(
    (newState) => {
      onChange(newState);
    },
    [onChange]
  );

  return (
    <>
      <DraftEditor
        ref={ref}
        editorState={value}
        handleKeyCommand={handleKeyCommand}
        onChange={changed}
      />
      <Toolbar value={value} onChange={changed} />
    </>
  );
});

Editor.displayName = 'Editor';

export default Editor;
