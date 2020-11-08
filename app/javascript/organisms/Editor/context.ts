import { EditorState } from 'draft-js';
import { createContext } from 'react';

interface ContextShape {
  state?: EditorState;
  onChange?(state: EditorState): void;
}

export default createContext<ContextShape>({});
