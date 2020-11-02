import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { EditorState, getVisibleSelectionRect, RichUtils } from 'draft-js';
import { usePopper } from 'react-popper';
import classNames from 'clsx';
import UilBold from '@iconscout/react-unicons/icons/uil-bold';
import UilItalic from '@iconscout/react-unicons/icons/uil-italic';
import UilLink from '@iconscout/react-unicons/icons/uil-link-h';

interface Props {
  value: EditorState;
  onChange(value: EditorState): void;
}

const Toolbar: React.FC<Props> = ({ value, onChange }: Props) => {
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

  const { styles, attributes, update } = usePopper(virtualElement.current, toolbar.current, {
    placement: 'top',
    modifiers: [
      { name: 'flip', options: { padding: 8 } },
      { name: 'arrow', options: { element: arrow.current, padding: 4 } },
      { name: 'offset', options: { offset: [0, 16] } },
    ],
  });

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

  useLayoutEffect(forceUpdate, [value, forceUpdate]);

  const currentStyle = useMemo(() => value.getCurrentInlineStyle(), [value]);

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
      onChange(RichUtils.toggleInlineStyle(value, style));
    },
    [value, onChange]
  );

  return (
    <div
      ref={toolbar}
      className={classNames('toolbar', 'editor__toolbar', !visible && 'editor__toolbar--hidden')}
      style={styles.popper}
      {...attributes.popper}
      onMouseDown={mouseDown}
    >
      <button
        type="button"
        className="button toolbar__button"
        aria-pressed={currentStyle.has('BOLD')}
        onClick={() => toggleStyle('BOLD')}
      >
        <UilBold className="button__icon" />
      </button>
      <button
        type="button"
        className="button toolbar__button"
        aria-pressed={currentStyle.has('ITALIC')}
        onClick={() => toggleStyle('ITALIC')}
      >
        <UilItalic className="button__icon" />
      </button>
      <button type="button" className="button toolbar__button">
        <UilLink className="button__icon" />
      </button>
      <span className="toolbar__arrow" ref={arrow} style={styles.arrow} />
    </div>
  );
};

export default Toolbar;
