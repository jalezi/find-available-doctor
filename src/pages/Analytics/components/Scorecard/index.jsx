/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import { useParams } from 'react-router';

import { cva } from 'class-variance-authority';

import { TrendingDownIcon, TrendingFlatIcon, TrendingUpIcon } from 'components/Shared/Icons';
import { Card, CardContent } from '../ui/card';

import styles from './Scorecard.module.css';

/**
 * Determines the trend name based on the change value.
 * @param {number} change - The change value.
 * @returns {ChangeDirection} The trend name ('up', 'down', 'no').
 */
function determineTrendName(change) {
  switch (true) {
    case change > 0:
      return 'up';
    case change < 0:
      return 'down';
    default:
      return 'no';
  }
}
/**
 * @typedef {"up" | "down" | "no"} ChangeDirection
 */

const colorVariants = cva('', {
  variants: {
    changeDirection: {
      up: styles.Success,
      down: styles.Danger,
      no: styles.Warn,
    },
  },
});

/**
 * Renders an icon based on the change direction.
 *
 * @param {Object} props - The component props.
 * @param {ChangeDirection} props.changeDirection - The direction of the change ('up', 'down', 'no').
 * @returns {JSX.Element|null} The icon component for the given change direction.
 */
const ChangeIcon = function ChangeIcon({ changeDirection }) {
  const iconProps = {
    size: 16,
    className: colorVariants({ changeDirection }),
  };

  switch (changeDirection) {
    case 'up':
      return <TrendingUpIcon {...iconProps} />;
    case 'down':
      return <TrendingDownIcon {...iconProps} />;
    case 'no':
      return <TrendingFlatIcon {...iconProps} />;
    default:
      return null;
  }
};

/**
 * @typedef {Object} DefaultVariantScorecardProps
 * @property {"scorecard"} scorecardType
 * @property {string} label
 * @property {number} value
 * @property {number} change
 * @property {ChangeDirection} changeDirection
 *
 * @typedef {Object} DescriptionVariantScorecardProps
 * @property {"description"} scorecardType
 * @property {string} valueLabel
 * @property {string} changeLabel
 */

/**
 * Renders a scorecard component displaying a label, value, and change information.
 *
 * @param {(DefaultVariantScorecardProps | DescriptionVariantScorecardProps)} props - The component props.
 * @returns {JSX.Element} The rendered scorecard component.
 */
const Scorecard = function Scorecard({
  scorecardType = 'scorecard',
  label,
  value,
  change,

  valueLabel,
  changeLabel,
}) {
  if (!['description', 'scorecard'].includes(scorecardType))
    throw new Error("scorecardType must be either 'description' or 'scorecard'");

  const { lng } = useParams();

  const isScorecard = scorecardType === 'scorecard';

  const valueFormat = Intl.NumberFormat(lng, { style: 'decimal' });
  const changeFarmat = Intl.NumberFormat(lng, {
    style: 'percent',
    signDisplay: 'always',
    maximumFractionDigits: 2,
  });

  const changeDirection = determineTrendName(change);

  const elements = isScorecard ? (
    <>
      <span className={styles.Label}>{label}</span>
      <span className={styles.Value}>{valueFormat.format(value)}</span>
      <div className={styles.ChangeDirection}>
        <ChangeIcon changeDirection={changeDirection} />
        <span className={colorVariants({ changeDirection })}>{changeFarmat.format(change)}</span>
      </div>
    </>
  ) : (
    <>
      <span className={styles.Label} />
      <span className={styles.DescriptionValue}>{valueLabel}</span>
      <span className={styles.DescriptionChangeDirection}>{changeLabel}</span>
    </>
  );

  return (
    <Card padding="none" className={styles.Scorecard}>
      <CardContent className={styles.Content}>{elements}</CardContent>
    </Card>
  );
};

export default Scorecard;
