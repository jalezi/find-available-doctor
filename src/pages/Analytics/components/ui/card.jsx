/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef } from 'react';

import { cva, cx } from 'class-variance-authority';

import styles from './card.module.css';

/**
 * @typedef {"div" | "article"} CardAs
 * @typedef {"div" | "header"} CardHeaderAs
 * @typedef {"span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h5" | "h6"} CardTitleAs
 *
 * @typedef {"div" | "figure" | "figcaption"} CardContentAs
 * @typedef {"div" | "footer"} CardFooterAs
 * @typedef {"title" | "subtitle"} CardTitleVariant
 */

const cardVariants = cva(styles.Card, {
  variants: {
    padding: {
      none: styles.PaddingNone,
      xs: styles.PaddingXS,
      sm: styles.PaddingSM,
      md: styles.PaddingMD,
      lg: styles.PaddingLG,
      xl: styles.PaddingXL,
    },
  },
  defaultVariants: {
    padding: 'md',
  },
});

/**
 * Card component
 * A container component that supports dynamic HTML elements via the `as` prop.
 *
 * @type {React.ForwardRefRenderFunction<
 *   HTMLDivElement,
 *   React.ComponentPropsWithRef<TCardAs> & {
 *     as?: TCardAs = "div";
 *     padding?: import('class-variance-authority').VariantProps<typeof cardVariants>['padding'];
 *   }
 * >}
 * @template {CardAs} TCardAs
 */
export const Card = forwardRef(({ as: Wrapper = 'div', className, padding, ...props }, ref) => (
  <Wrapper ref={ref} className={cardVariants({ padding, className })} {...props} />
));

Card.displayName = 'Card';

/**
 * CardHeader component
 * A header component that supports dynamic HTML elements via the `as` prop.
 *
 * @type {React.ForwardRefRenderFunction<
 *   HTMLElement<TCardHeaderAs>,
 *   React.ComponentPropsWithRef<TCardHeaderAs> & {
 *     as?: TCardHeaderAs = "header";
 *   }
 * >}
 * @template {CardHeaderAs} TCardHeaderAs
 */
export const CardHeader = forwardRef(({ as: Wrapper = 'header', className, ...props }, ref) => (
  <Wrapper ref={ref} className={cx(styles.Header, className)} {...props} />
));

CardHeader.displayName = 'CardHeader';

const titleVariants = cva('', {
  variants: {
    variant: {
      title: styles.Title,
      subtitle: styles.Subtitle,
      description: styles.Description,
    },
  },
  defaultVariants: {
    variant: 'title',
  },
});

/**
 * CardTitle component
 * A title component that supports dynamic HTML elements via the `as` prop.
 *
 * @type {React.ForwardRefRenderFunction<
 *   HTMLElement,
 *   React.ComponentPropsWithRef<TCardTitleAs> & {
 *     as?: TCardTitleAs = "span";
 *     variant?: CardTitleVariant;
 *   }
 * >}
 * @template {CardTitleAs} TCardTitleAs
 */
export const CardTitle = forwardRef(
  ({ as: Wrapper = 'div', variant = 'title', className, ...props }, ref) => (
    <Wrapper ref={ref} className={titleVariants({ variant, className })} {...props} />
  ),
);

CardTitle.displayName = 'CardTitle';

/**
 * CardContent component
 * A content component that supports dynamic HTML elements via the `as` prop.
 * @type {React.ForwardRefRenderFunction<
 *  HTMLElement,
 * React.ComponentPropsWithRef<HTMLDivElement> & {
 *  as?: TCardContentAs = "div";
 * }
 * >}
 *
 * @template {CardContentAs} TCardContentAs
 */
export const CardContent = forwardRef(({ as: Wrapper = 'div', className, ...props }, ref) => (
  <Wrapper ref={ref} className={cx(styles.Content, className)} {...props} />
));

/**
 * CardDescription component
 *
 * @type {React.ForwardRefRenderFunction<
 *  HTMLElement,
 *  React.ComponentPropsWithRef<HTMLDivElement>
 * >}
 */
export const CardDescription = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cx(styles.Description, className)} {...props} />
));

CardDescription.displayName = 'CardDescription';

/**
 * CardFooter component
 * A footer component that supports dynamic HTML elements via the `as` prop.
 * @type {React.ForwardRefRenderFunction<
 *  HTMLElement,
 * React.ComponentPropsWithRef<TCardFooterAs> & {
 *  as?: TCardFooterAs = "footer";
 * }
 * >}
 *
 * @template {CardFooterAs} TCardFooterAs
 */
export const CardFooter = forwardRef(({ as: Wrapper = 'footer', className, ...props }, ref) => (
  <Wrapper ref={ref} className={cx(styles.Footer, className)} {...props} />
));

CardFooter.displayName = 'CardFooter';
