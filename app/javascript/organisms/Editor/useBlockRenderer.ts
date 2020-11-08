import { ContentBlock } from 'draft-js';
import { useCallback } from 'react';
import EditorBlock from './EditorBlock';

type BlockRendererFunction = (block: ContentBlock) => unknown;

type UseBlockRendererHook = () => BlockRendererFunction;

const useBlockRenderer: UseBlockRendererHook = () => {
  const blockRendererFn = useCallback(
    (block) => ({
      component: EditorBlock,
      editable: block.getType() !== 'atomic',
      props: {},
    }),
    []
  );
  return blockRendererFn;
};

export default useBlockRenderer;
