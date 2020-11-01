import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Draft, { EditorState as DraftEditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import Editor from '../editor/index';

const fetchJSON = (url: RequestInfo, options: RequestInit = {}) => {
  const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': csrf,
    },
    credentials: 'same-origin',
    ...options,
  }).then((response) => response.json());
};

const useFetchNode = (id: string): { loading: boolean; content: Draft.RawDraftContentState } => {
  const [loading, setLoading] = useState(true);

  const [content, setContent] = useState<Draft.RawDraftContentState>(null);

  useEffect(() => {
    setLoading(true);

    fetchJSON(`/nodes/${id}`).then(({ content }) => {
      setContent(content);
      setLoading(false);
    });
  }, [id]);

  return { loading, content };
};

type NodeEditorProps = {
  id: string;
};

const NodeEditor = ({ id }: NodeEditorProps) => {
  const ref = useRef();

  const { loading, content } = useFetchNode(id);

  const [editorState, setEditorState] = useState(() => DraftEditorState.createEmpty());

  const save = useCallback(() => {
    fetchJSON(`/nodes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ node: { content: convertToRaw(editorState.getCurrentContent()) } }),
    });
  }, [editorState, id]);

  useEffect(() => {
    if (content) {
      setEditorState(DraftEditorState.createWithContent(convertFromRaw(content)));
    }
  }, [content]);

  return (
    <>
      <button type="button" onClick={save}>
        Save
      </button>
      <Editor ref={ref} value={editorState} onChange={setEditorState} />
    </>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.editor').forEach((editor: HTMLElement) => {
    ReactDOM.render(<NodeEditor id={editor.dataset.id} />, editor);
  });
});
