import React from 'react';
import { EditorBlock as DraftEditorBlock } from 'draft-js';

const EditorBlock: React.FC = (props) => <DraftEditorBlock {...props} />;

export default EditorBlock;
