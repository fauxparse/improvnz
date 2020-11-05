import React, { useReducer, useState } from 'react';
import Toolbar from '..';
import ToolbarGroup from '../ToolbarGroup';

export default {
  Formatting: () => {
    const [styles, toggleStyle] = useReducer((state, style) => {
      const newStyle = new Set(state);
      if (newStyle.has(style)) {
        newStyle.delete(style);
      } else {
        newStyle.add(style);
      }
      return newStyle;
    }, new Set());

    const [justify, setJustify] = useState('left');

    return (
      <Toolbar>
        <ToolbarGroup aria-label="Formatting">
          <Toolbar.Button
            icon="bold"
            aria-label="Bold"
            aria-pressed={styles.has('bold')}
            onClick={() => toggleStyle('bold')}
          />
          <Toolbar.Button
            icon="italic"
            aria-label="Italic"
            aria-pressed={styles.has('italic')}
            onClick={() => toggleStyle('italic')}
          />
          <Toolbar.Button
            icon="underline"
            aria-label="Underline"
            aria-pressed={styles.has('underline')}
            onClick={() => toggleStyle('underline')}
          />
          <Toolbar.Button
            icon="code"
            aria-label="Code"
            aria-pressed={styles.has('code')}
            onClick={() => toggleStyle('code')}
          />
        </ToolbarGroup>
        <Toolbar.Separator />
        <Toolbar.Group role="radiogroup" aria-label="Justify text">
          <Toolbar.Button
            icon="justify-left"
            aria-label="Left justify"
            aria-pressed={justify === 'left'}
            onClick={() => setJustify('left')}
          />
          <Toolbar.Button
            icon="justify-center"
            aria-label="Center"
            aria-pressed={justify === 'center'}
            onClick={() => setJustify('center')}
          />
          <Toolbar.Button
            icon="justify-right"
            aria-label="Right justify"
            aria-pressed={justify === 'right'}
            onClick={() => setJustify('right')}
          />
        </Toolbar.Group>
        <Toolbar.Separator />
        <ToolbarGroup aria-label="Insert">
          <Toolbar.Button icon="link" aria-label="Insert link" />
          <Toolbar.Button icon="image" aria-label="Insert image" />
        </ToolbarGroup>
      </Toolbar>
    );
  },
};
