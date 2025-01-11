/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */

/** @import * as Types from '../../types' */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CustomPopover.module.css';

/**
 * Customizable popover component that manages visibility and interaction with popover items.
 *
 * @param {Object} props - The properties of the Popover component.
 * @param {React.ReactNode} props.children - The content that triggers the popover.
 * @param {string} [props.triggerClassname=styles.PopoverTrigger] - The CSS class for the trigger button.
 * @param {Types.Placement} [props.placement='bottom-center'] - The default placement of the popover.
 * @param {Types.PopoverCustomOption[]} [props.options=[{ label: 'Edit', onClick: () => {}, Icon: undefined }]] - The array of options to display in the popover.
 * @param {React.JSXElementConstructor<(React.HTMLAttributes<HTMLButtonElement> & PopoverCustomOption)> } [props.renderItem] - The custom item renderer function for each option.
 * @returns {React.JSX.Element} A popover component with customizable options and behavior.
 */
const Popover = function Popover({
  children,
  triggerClassname = styles.PopoverTrigger,
  placement = 'bottom-center',
  options = [{ label: 'Edit', onClick: () => {}, Icon: undefined }],
  renderItem = ({ label, onClick, Icon, ...props }) => (
    <button type="button" onClick={onClick} className={styles.PopoverItem} {...props}>
      {Icon ? <Icon /> : null}
      {label}
    </button>
  ),
}) {
  const [isVisible, setIsVisible] = useState(false); // Manages the visibility state of the popover
  const [focusedIndex, setFocusedIndex] = useState(-1); // Manages the focus state of the popover items
  const popoverRef = useRef(null); // Reference to the popover element
  const triggerRef = useRef(null); // Reference to the button element that triggers the popover

  const validOptions = options.filter(option => option !== null);

  const toggleVisibility = event => {
    if (!isVisible && event.key === 'Enter') {
      triggerRef.current?.focus();
    }
    setIsVisible(!isVisible);
  };

  const closePopover = () => {
    setIsVisible(false);
    setFocusedIndex(-1);
  };

  const handlePopoverContentClick = event => {
    if (event.button === 2) {
      return;
    }

    const target = event?.target;
    const currentTarget = event?.currentTarget;

    if (target === currentTarget) {
      return;
    }
    target?.click();
  };

  const handleItemClick = (_, index) => {
    closePopover();
    validOptions[index].onClick();
  };

  // Handle key events for the dropdown
  const handleKeyDown = event => {
    const { key } = event;

    if (!isVisible) return;

    if (key === 'Tab') {
      event.preventDefault();
      setFocusedIndex(prevIndex => {
        if (prevIndex === -1) {
          return 1 % validOptions.length;
        }
        const nextIndex = prevIndex === validOptions.length - 1 ? 0 : prevIndex + 1;
        return nextIndex;
      });
    }

    if (key === 'ArrowDown') {
      event.preventDefault();
      setFocusedIndex(prevIndex => (prevIndex + 1) % validOptions.length);
    }

    if (key === 'ArrowUp') {
      event.preventDefault();
      setFocusedIndex(prevIndex => (prevIndex === 0 ? validOptions.length - 1 : prevIndex - 1));
    }

    if (key === 'Escape') {
      closePopover();
    }
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        closePopover(); // Close the popover if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setFocusedIndex(-1);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && focusedIndex !== -1) {
      const item = popoverRef.current.children[focusedIndex];
      item?.focus();
    }
  }, [isVisible, focusedIndex]);

  return (
    <div className={styles.PopoverContainer}>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleVisibility}
        className={triggerClassname}
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content"
      >
        {children}
      </button>
      {isVisible && (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <div
          id="popover-content"
          ref={popoverRef}
          className={styles.PopoverContent}
          role="dialog"
          aria-modal="true"
          data-placement={placement ?? 'bottom-center'}
          onKeyDown={handleKeyDown}
          onMouseDown={handlePopoverContentClick}
        >
          {validOptions.map((option, index) =>
            renderItem({
              ...option,
              key: index,
              tabIndex: focusedIndex === index ? 0 : -1,
              onClick: event => handleItemClick(event, index),
            }),
          )}
        </div>
      )}
    </div>
  );
};

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf([
    'top',
    'top-start',
    'top-end',
    'start',
    'bottom',
    'bottom-start',
    'bottom-end',
    'end',
  ]),
  triggerClassname: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      icon: PropTypes.node,
    }).isRequired,
  ),
  renderItem: PropTypes.func,
};

export default Popover;
