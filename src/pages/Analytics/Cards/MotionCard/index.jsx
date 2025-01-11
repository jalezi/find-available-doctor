/* eslint-disable react/prop-types */
import ChartHeader from 'pages/Analytics/components/chart-header';
import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';
import { byAgeGroupAndYearMap } from 'pages/Analytics/data/fake-data';

import { Fragment } from 'react';
import MotionCardHighMap from './MotionCardHighMap';
import styles from './MotionCardHighMap.module.css';

/**
 * @param {Object} props
 * @param {React.ComponentProps<"article">["id"]} props.id - The unique identifier for the chart.
 * @param {React.ComponentProps<"article">["className"]} props.className - The class name for the chart. Defaults to an empty string.
 * @returns {JSX.Element} The rendered RichInfoClick component.
 */
const MotionCard = function MotionCard({ id, className = '' }) {
  const ageGroups = Array.from(byAgeGroupAndYearMap.keys());
  return (
    <Card as="article" id={id} className={className}>
      <ChartHeader title="Motion Card" />

      {ageGroups.map(ageGroup => (
        <Fragment key={ageGroup}>
          <CardHeader>
            <CardTitle variant="subtitle">Starostna skupina: {ageGroup}</CardTitle>
          </CardHeader>
          <CardContent key={ageGroup} className={styles.ParentWrapper}>
            <MotionCardHighMap data={byAgeGroupAndYearMap.get(ageGroup)} ageGroup={ageGroup} />
          </CardContent>
        </Fragment>
      ))}
    </Card>
  );
};

export default MotionCard;
