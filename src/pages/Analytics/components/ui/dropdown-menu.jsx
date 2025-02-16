/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import { forwardRef } from 'react';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cx } from 'class-variance-authority';
import { Check, ChevronRight, Circle } from 'lucide-react';
import PropTypes from 'prop-types';
import styles from './dropdown-menu.module.css';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {boolean} [props.inset]
 * @param {React.Ref<HTMLDivElement>} ref
 */
const DropdownMenuSubTrigger = forwardRef(
  ({ className = undefined, inset, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cx(styles.subTrigger, inset && styles.inset, className)}
      {...props}
    >
      {children}
      <ChevronRight className={styles.chevronRight} />
    </DropdownMenuPrimitive.SubTrigger>
  ),
);
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

DropdownMenuSubTrigger.propTypes = {
  className: PropTypes.string,
  inset: PropTypes.bool,
  children: PropTypes.node,
};

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.Ref<HTMLDivElement>} ref
 */
const DropdownMenuSubContent = forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cx(styles.content, className)}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

DropdownMenuSubContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.Ref<HTMLDivElement>} ref
 */
const DropdownMenuContent = forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cx(styles.content, className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {boolean} [props.inset]
 * @param {React.Ref<HTMLDivElement>} ref
 */
const DropdownMenuItem = forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cx(styles.menuItem, inset && styles.inset, className)}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {boolean} [props.checked]
 * @param {React.Ref<HTMLDivElement>} ref
 */
const DropdownMenuCheckboxItem = forwardRef(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cx(styles.checkboxItem, className)}
    checked={checked}
    {...props}
  >
    <span className={styles.itemIndicator}>
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className={styles.checkIcon} />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.Ref<HTMLDivElement>} ref
 */
const DropdownMenuRadioItem = forwardRef(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem ref={ref} className={cx(styles.menuItem, className)} {...props}>
    <span className={styles.radioIndicator}>
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className={styles.circleIcon} />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {boolean} [props.inset]
 * @param {React.Ref<HTMLDivElement>} ref
 */
const DropdownMenuLabel = forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cx(styles.label, inset && styles.labelInset, className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.Ref<HTMLDivElement>} ref
 */
const DropdownMenuSeparator = forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cx(styles.separator, className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

/**
 * @param {Object} props
 * @param {React.HTMLAttributes<HTMLSpanElement>} props
 */
function DropdownMenuShortcut({ className, ...props }) {
  return <span className={cx(styles.shortcut, className)} {...props} />;
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
