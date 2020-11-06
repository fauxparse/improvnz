import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { EditorState, getVisibleSelectionRect, RichUtils } from 'draft-js';
import { usePopper } from 'react-popper';
import classNames from 'clsx';
import Toolbar from '../../molecules/Toolbar';
import Floater, { FloaterPosition } from '../../molecules/Floater';

interface EditorToolbarProps {
  state: EditorState;
  onChange(state: EditorState): void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ state, onChange }) => {
  const toolbar = useRef();

  const arrow = useRef();

  const [visible, setVisible] = useState<boolean>(false);

  const virtualElement = useRef({
    getBoundingClientRect: () => ({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: 0,
      height: 0,
    }),
  });

  const { styles, attributes, update, state: popperState } = usePopper(
    virtualElement.current,
    toolbar.current,
    {
      placement: 'top',
      modifiers: [
        { name: 'flip', options: { padding: 8 } },
        { name: 'arrow', options: { element: arrow.current, padding: 4 } },
        { name: 'offset', options: { offset: [0, 16] } },
      ],
    }
  );

  const forceUpdate = useCallback(() => {
    const rect = getVisibleSelectionRect(window);

    setVisible(rect && rect.width > 0);

    if (rect) {
      const { scrollY: originalScrollY } = window;

      virtualElement.current.getBoundingClientRect = () => {
        const { scrollX, scrollY, innerHeight } = window;
        const top = Math.min(innerHeight, rect.top - scrollY + originalScrollY);
        const bottom = Math.max(0, top + rect.height);
        return {
          top,
          right: rect.top - scrollX,
          bottom,
          left: rect.left - scrollX,
          width: rect.width,
          height: bottom - top,
        };
      };

      update();
    }
  }, [update]);

  useLayoutEffect(forceUpdate, [state, forceUpdate]);

  const currentStyle = useMemo(() => state.getCurrentInlineStyle(), [state]);

  const updateTimer = useRef();

  const requestUpdate = useCallback(() => {
    clearTimeout(updateTimer.current);
    setTimeout(forceUpdate, 100);
  }, [forceUpdate]);

  useEffect(() => {
    if (visible) {
      window.addEventListener('resize', requestUpdate);
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        clearTimeout(updateTimer.current);
        window.removeEventListener('resize', requestUpdate);
      };
    }
  }, [visible, requestUpdate]);

  const mouseDown = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const toggleStyle = useCallback(
    (style) => {
      onChange(RichUtils.toggleInlineStyle(state, style));
    },
    [state, onChange]
  );

  const { placement } = popperState || {};

  const position = useMemo(() => FloaterPosition[placement] || FloaterPosition.bottom, [placement]);

  return (
    <Floater
      ref={toolbar}
      className={classNames('toolbar', 'editor__toolbar', !visible && 'editor__toolbar--hidden')}
      position={position}
      style={styles.popper}
      {...attributes.popper}
      onMouseDown={mouseDown}
      data-theme="dark"
    >
      <Toolbar>
        <Toolbar.Button
          small
          icon="bold"
          aria-pressed={currentStyle.has('BOLD')}
          onClick={() => toggleStyle('BOLD')}
        />
        <Toolbar.Button
          small
          icon="italic"
          aria-pressed={currentStyle.has('ITALIC')}
          onClick={() => toggleStyle('ITALIC')}
        />
        <Toolbar.Button
          small
          icon="underline"
          aria-pressed={currentStyle.has('UNDERLINE')}
          onClick={() => toggleStyle('UNDERLINE')}
        />
        <Toolbar.Button
          small
          icon="code"
          aria-pressed={currentStyle.has('CODE')}
          onClick={() => toggleStyle('CODE')}
        />
        <Toolbar.Separator />
        <Toolbar.Button small icon="link" />
        <Toolbar.Button small icon="image" />
      </Toolbar>
    </Floater>
  );
};

export default EditorToolbar;
