/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import { cx } from 'class-variance-authority';

import styles from './separator.module.css';

/**
 * @typedef {"horizontal" | "vertical"} Orientation
 * @typedef {"div" | "hr"} SeparatorAs
 *
 */

const NAME = 'Separator';
/**
 * @constant {Orientation[number]} DEFAULT_ORIENTATION
 * @type {"horizontal"}
 */
const DEFAULT_ORIENTATION = 'horizontal';
/** @type Orientation[] */
const ORIENTATIONS = ['horizontal', 'vertical'];

/**
 * Checks if the given orientation is valid.
 *
 * @param {any} orientation - The orientation to check.
 * @returns {boolean} True if the orientation is valid, false otherwise.
 */
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}

/**
 * Separator component
 * A horizontal or vertical separator component.
 *
 * @type {React.FC<
 *  React.ComponentProps<TSeparatorAs> & {
 *    as?: TSeparatorAs = "div",
 *    orientation?: Orientation,
 *    decorative?: boolean}
 * >}
 *
 * @template {SeparatorAs} TSeparatorAs
 */
export const Separator = function Separator({
  as: Wrapper = 'div',
  orientation: orientationProp = DEFAULT_ORIENTATION,
  decorative,
  className,
  ...domProps
}) {
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  // `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
  const ariaOrientation = orientation === 'vertical' ? orientation : undefined;
  const semanticProps = decorative
    ? { role: 'none' }
    : { 'aria-orientation': ariaOrientation, role: 'separator' };

  return (
    <Wrapper
      data-orientation={orientation}
      className={cx(styles.Separator, className)}
      {...semanticProps}
      {...domProps}
    />
  );
};

Separator.displayName = NAME;
