// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Editor as DraftEditor, EditorState as DraftEditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

const Editor = () => {
  const [editorState, setEditorState] = useState(() => DraftEditorState.createEmpty());

  useEffect(() => {
    console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);

  return <DraftEditor editorState={editorState} onChange={setEditorState} />;
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Editor />, document.body.appendChild(document.createElement('div')));
});
