import React from 'react';

export interface DropPosition {
  block?: HTMLElement;
  insert?: 'before' | 'after';
}

const top = (block, insert) => {
  if (!block) return '0px';
  return `${block.offsetTop + (insert === 'after' ? block.offsetHeight : 0)}px`;
};

const InsertionPoint: React.FC<DropPosition> = ({ block, insert }) => (
  <div
    className="editor__insertion-point"
    style={{
      display: block ? 'block' : 'none', // stylelint-disable-line
      top: top(block, insert),
    }}
  />
);

export default InsertionPoint;
