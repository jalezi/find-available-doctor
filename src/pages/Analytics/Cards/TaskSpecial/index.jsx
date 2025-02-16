/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';

import { cx } from 'class-variance-authority';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { t } from 'i18next';

import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';
import { Separator } from 'pages/Analytics/components/ui/separator';
import { useFilterState } from 'pages/Analytics/hooks';

import { createCSVContent, exportToCsv, exportToJson } from 'pages/Analytics/utils/download-utils';
import ChartActions from 'pages/Analytics/components/ChartActions';
import FilterForm from './FilterForm';
import { options } from './chart-options';
import { useChart } from './useChart';

import { DEFAULTS, uniqueOverviewDoctorTypesSet } from '../TaskA/constants';

import styles from '../Cards.module.css';

const csvHeaders = [
  'year',
  'insuredPeopleCount',
  'insuredPeopleCountWithIOZ',
  'insuredPeopleCountWithoutIOZ',
  'iozRatio',
];

const TaskSpecial = function TaskSpecial({ id }) {
  /** @type {React.RefObject<Types.HighchartsReactRefObject>} */
  const chartRef = useRef(null);

  const tTaskSpecial = t('analytics.taskSpecial', { returnObjects: true });

  const [init, setInit] = useState(false);
  const { filterState, onFilterChange } = useFilterState({ doctorType: DEFAULTS.doctorType });

  useEffect(() => {
    if (!init) {
      setInit(true);
    }
  }, [init]);

  const { chartOptions } = useChart(options, {
    filterState,
    notVisibleSeries: [],
  });

  const handleCsvDownload = () => {
    const filename = `${filterState.doctorType}_sum.csv`;
    const pointsWithData = chartRef.current?.chart?.series[0].points.map(point =>
      Object.fromEntries(Object.entries(point.options).filter(([key]) => csvHeaders.includes(key))),
    );
    exportToCsv(createCSVContent(pointsWithData, csvHeaders), filename);
  };

  const handleJsonDownload = () => {
    const filename = `${filterState.doctorType}_sum.json`;
    const pointsWithData = chartRef.current?.chart?.series[0].points.map(point =>
      Object.fromEntries(Object.entries(point.options).filter(([key]) => csvHeaders.includes(key))),
    );
    exportToJson({ doctorType: filterState.doctorType, data: pointsWithData }, filename);
  };

  const openFullScreen = () => {
    chartRef.current.chart.fullscreen.open();
  };

  const printChart = () => {
    chartRef.current.chart.print();
  };

  return (
    <Card id={id} className={styles.CardWrapper}>
      <div className={cx(styles.Grid, styles.SingleChartGrid)}>
        <CardHeader className={styles.Header}>
          <CardTitle as="h3">{tTaskSpecial.title}</CardTitle>
          <ChartActions
            actions={{
              openFullScreen,
              printChart,
              handleCsvDownload,
              handleJsonDownload,
            }}
          />
        </CardHeader>
        <Separator className={styles.Separator} />
        <CardContent className={styles.FiltersWrapper}>
          <FilterForm
            filterState={filterState}
            onChange={onFilterChange}
            filterOptions={{
              doctorTypes: [...uniqueOverviewDoctorTypesSet].filter(item =>
                ['gp', 'den', 'gyn'].includes(item),
              ),
            }}
          />
        </CardContent>
        <CardContent className={styles.ChartWrapper}>
          <figure>
            <HighchartsReact ref={chartRef} highcharts={Highcharts} options={chartOptions} />
          </figure>
        </CardContent>
      </div>
    </Card>
  );
};

export default TaskSpecial;
