import React, { useState } from 'react';
import { Node } from 'slate';
import Editor, { EditorProps } from '..';

const EditorDemo: React.FC<Omit<EditorProps, 'value' | 'onChange'>> = (props) => {
  const [value, setValue] = useState<Node[]>([
    { type: 'paragraph', children: [{ text: 'edit me' }] },
  ]);

  return <Editor value={value} onChange={setValue} {...props} />;
};

export default <EditorDemo spellCheck />;
