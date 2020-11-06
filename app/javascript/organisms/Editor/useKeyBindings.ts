import { useCallback, KeyboardEvent } from 'react';
import { EditorState, DraftHandleValue, RichUtils, getDefaultKeyBinding } from 'draft-js';

type UseKeyBindingsHook = (
  state: EditorState,
  onChange: (EditorState) => void
) => {
  keyBindingFn: (e: KeyboardEvent) => string;
  handleKeyCommand: (command: string) => DraftHandleValue;
};

const useKeyBindings: UseKeyBindingsHook = (state, onChange) => {
  const keyBindingFn = useCallback(
    (e) => {
      if (e.key === 'Tab') {
        const newState = RichUtils.onTab(e, state, 6);
        if (newState !== state) {
          e.preventDefault();
          onChange(newState);
        }
        return;
      }
      return getDefaultKeyBinding(e);
    },
    [state, onChange]
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

  return { keyBindingFn, handleKeyCommand };
};

export default useKeyBindings;
