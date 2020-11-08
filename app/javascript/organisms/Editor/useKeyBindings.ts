import { useCallback, KeyboardEvent } from 'react';
import {
  EditorState,
  DraftHandleValue,
  RichUtils,
  getDefaultKeyBinding,
  Modifier,
  SelectionState,
} from 'draft-js';

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
      if (command === 'backspace') {
        const selection = state.getSelection();
        const content = state.getCurrentContent();
        const block = content.getBlockForKey(selection.getFocusKey());

        // Delete an empty block after an atomic block
        if (selection.isCollapsed() && block.getLength() === 0) {
          const previousBlock = content.getBlockBefore(block.getKey());
          const nextBlock = content.getBlockAfter(block.getKey());
          if (previousBlock.getType() === 'atomic' && nextBlock) {
            onChange(
              EditorState.set(state, {
                currentContent: Modifier.removeRange(
                  content,
                  SelectionState.createEmpty(block.getKey()).merge({
                    focusKey: nextBlock.getKey(),
                    focusOffset: 0,
                  }),
                  'forward'
                ),
              })
            );
          }
          return 'handled';
        }
      }

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
