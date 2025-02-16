/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/** @import * as Types from "./types" */

import { useEffect, useMemo, useRef, useState } from 'react';

import { cx } from 'class-variance-authority';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { t } from 'i18next';

import { withErrorBoundary } from 'components/Shared/ErrorBoundary';
import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';
import { Separator } from 'pages/Analytics/components/ui/separator';

import { useFilterState } from 'pages/Analytics/hooks';
import { createCSVContent, exportToCsv, exportToJson } from 'pages/Analytics/utils/download-utils';

import ChartActions from 'pages/Analytics/components/ChartActions';
import { secondChartOptions } from '../TaskA/chart-options';
import { DEFAULTS, uniqueOverviewDoctorTypesSet } from './constants';

import { prepareDetailLineChartSeries } from '../TaskA/detail-data-util';
import { FilterForm } from './FilterForm';
import { calculateYearlyStatistics } from '../TaskA/scorecards-calc-util';

import styles from '../Cards.module.css';

const TaskATrend = function TaskATrend({ id }) {
  const tTaskATrend = t('analytics.taskATrend', { returnObjects: true });
  const [, setInit] = useState(false);
  const { filterState, onFilterChange } = useFilterState(DEFAULTS);

  const [chartOptions, setChartOptions] = useState({
    ...secondChartOptions,
    accessibility: {
      screenReaderSection: {
        beforeChartFormat: '<h4>{chartSubtitle} {chartTitle}</h4>',
      },
    },
  });

  /** @type {React.RefObject<Types.HighchartsReactRefObject>} */
  const chartRef = useRef(null);

  useEffect(() => {
    setInit(true);
  }, []);

  const { doctorType } = filterState;

  const chartSeries = useMemo(() => prepareDetailLineChartSeries([], doctorType), [doctorType]);

  useEffect(() => {
    setChartOptions({
      series: chartSeries,
    });
  }, [chartSeries]);

  const currentSelectedYear = Number(filterState.year);
  const stats = useMemo(
    () => calculateYearlyStatistics(currentSelectedYear, chartSeries),
    [currentSelectedYear, chartSeries],
  );

  const handleCsvDownload = () => {
    const filename = `neopredeljeni-${filterState.doctorType}.csv`;

    const data = chartSeries.map(item => ({
      ageGroup: item.name,
      data: item.data.map(d => ({
        year: d.year,
        ageGroup: item.name,
        insuredPeopleCount: d.insuredPeopleCount,
        insuredPeopleCountWithIOZ: d.insuredPeopleCountWithIOZ,
        insuredPeopleCountWithoutIOZ: d.insuredPeopleCountWithoutIOZ,
        iozRatio: d.iozRatio,
        selection: ['Slovenija'],
        isCities: 'Ne',
      })),
    }));

    const csvHeaders = [
      'year',
      'ageGroup',
      'insuredPeopleCount',
      'insuredPeopleCountWithIOZ',
      'insuredPeopleCountWithoutIOZ',
      'iozRatio',
      'selection',
      'isCities',
    ];

    exportToCsv(
      createCSVContent(
        data.flatMap(d => d.data),
        csvHeaders,
      ),
      filename,
    );
  };

  const handleJsonDownload = () => {
    const filename = `age-group-neopredeljeni-${filterState.doctorType}.json`;
    const data = chartSeries.map(item => ({
      ageGroup: item.name,
      data: item.data.map(d => ({
        year: d.year,
        ageGroup: item.name,
        insuredPeopleCount: d.insuredPeopleCount,
        insuredPeopleCountWithIOZ: d.insuredPeopleCountWithIOZ,
        insuredPeopleCountWithoutIOZ: d.insuredPeopleCountWithoutIOZ,
        iozRatio: d.iozRatio,
      })),
    }));

    exportToJson(
      { type: filterState.doctorType, stats, isCities: false, selection: ['Slovenija'], data },
      filename,
    );
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
          <CardTitle as="h3">{tTaskATrend.title}</CardTitle>
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
              doctorTypes: [...uniqueOverviewDoctorTypesSet].filter(
                v => v !== 'betterAccessibility',
              ),
            }}
          />
        </CardContent>

        <CardContent className={styles.ChartWrapper}>
          <figure>
            <HighchartsReact
              ref={chartRef}
              highcharts={Highcharts}
              options={chartOptions}
              constructorType="chart"
            />
          </figure>
        </CardContent>
      </div>
    </Card>
  );
};

export default withErrorBoundary(TaskATrend);
