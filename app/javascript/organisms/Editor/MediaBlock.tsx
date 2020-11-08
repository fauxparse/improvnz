import React from 'react';
import { ContentState, ContentBlock } from 'draft-js';

interface MediaBlockProps {
  block: ContentBlock;
  contentState: ContentState;
}

const MediaBlock: React.FC<MediaBlockProps> = ({ block, contentState }) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const data = entity.getData();

  switch (entity.getType()) {
    case 'image':
      return (
        <div className="media">
          {data.urls.map((url) => (
            <img key={url} className="media__image" src={url} />
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default MediaBlock;
