/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import { cx } from 'class-variance-authority';

import styles from './Label.module.css';

const Label = function Label({ children, className, ...props }) {
  return (
    <label className={cx(styles.Label, className)} {...props}>
      {children}
    </label>
  );
};

export default Label;
