/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef, useRef } from 'react';

import { cx } from 'class-variance-authority';
import styles from './Buttons.module.css';

/**
 * Button component renders a button that toggles its visibility state and triggers an onClick event.
 * @type {React.ForwardRefRenderFunction<
 *  HTMLButtonElement,
 * React.ComponentPropsWithRef<"button"> & {
 *   onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
 *   className?: string;
 *   type?: "button" | "submit" | "reset";
 * }
 *
 */
export const Button = forwardRef(
  ({ children, onClick, className, type = 'button', ...props }, ref) => {
    /** @type React.RefObject<HTMLButtonElement } scoreRef = useRef(null); */
    const scoreRef = useRef(null);

    const handleClick = e => {
      onClick?.(e);
    };

    return (
      <button
        ref={ref ?? scoreRef}
        // eslint-disable-next-line react/button-has-type
        type={type}
        onClick={handleClick}
        className={cx(styles.Buttons, className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
