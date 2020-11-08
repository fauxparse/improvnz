import { ContentBlock } from 'draft-js';
import EditorBlock from './EditorBlock';
import MediaBlock from './MediaBlock';

const blockRendererFn: (block: ContentBlock) => unknown = (block) => {
  const type = block.getType();

  if (type === 'atomic') {
    return {
      component: MediaBlock,
      editable: false,
      props: {
        foo: 'bar',
      },
    };
  }

  return {
    component: EditorBlock,
    editable: true,
    props: {},
  };
};

export default blockRendererFn;
