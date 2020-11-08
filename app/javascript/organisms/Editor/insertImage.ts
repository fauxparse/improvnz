import { EditorState, SelectionState, AtomicBlockUtils } from 'draft-js';

const insertImage = (
  state: EditorState,
  selection: SelectionState,
  urls: string[]
): EditorState => {
  const content = state.getCurrentContent();
  const contentStateWithEntity = content.createEntity('image', 'IMMUTABLE', { urls });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const blockInserted = AtomicBlockUtils.insertAtomicBlock(
    EditorState.set(state, {
      currentContent: contentStateWithEntity,
      selection,
    }),
    entityKey,
    ' '
  );

  return blockInserted;
};

export default insertImage;
