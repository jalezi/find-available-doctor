/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/** @import * as Types from "../../../types" */
/** @import * as TaskDTypes from "./types" */
import { useEffect, useRef, useState } from 'react';

import { cx } from 'class-variance-authority';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { t } from 'i18next';

import { withErrorBoundary } from 'components/Shared/ErrorBoundary';
import { useChart } from 'pages/Analytics/Cards/TaskD/useChart';
import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';

import { Separator } from 'pages/Analytics/components/ui/separator';
import { useFilterState } from 'pages/Analytics/hooks';
import { createCSVContent, exportToCsv, exportToJson } from 'pages/Analytics/utils/download-utils';

import ChartActions from 'pages/Analytics/components/ChartActions';
import { initialChartOptions } from './chart-options';
import FilterForm from './FilterForm';
import { groupOptions } from './parsed-files';

import styles from '../Cards.module.css';

const csvHeaders = ['date', 'javni', 'zasebni'];

function prepareDataForExport(series) {
  const pointsWithData = series.flatMap(serie =>
    serie.points.map(point => ({
      date: new Date(point.x).toISOString().slice(0, 10),
      [serie.name]: point.y,
    })),
  );

  return pointsWithData.reduce((acc, point) => {
    const existing = acc.find(item => item.date === point.date);
    if (existing) {
      Object.assign(existing, point);
    } else {
      acc.push(point);
    }
    return acc;
  }, []);
}

/**
 * TaskD component renders a card with a content.
 * @param {Object} props - The properties object.
 * @param {React.ComponentProps<"article">["id"]} props.id - The unique identifier for the card.
 * @returns {JSX.Element} The rendered TaskD component.
 */
const TaskD = function TaskD({ id }) {
  /** @type {Types.HighchartsReactRefObject} */
  const chartRef = useRef(null);
  const [init, setInit] = useState(false);

  const tTaskD = t('analytics.taskD', { returnObjects: true });

  /** @type {[TaskDTypes.FilterState, React.Dispatch<React.SetStateAction<TaskDTypes.FilterState>>]} */
  const { filterState, onFilterChange } = useFilterState({
    data: groupOptions[0].options[0].value,
    group: groupOptions[0].options[0].group,
  });

  useEffect(() => {
    if (!init) {
      setInit(true);
    }
  }, [init]);

  /** @type {{chartOptions : Types.HighchartsOptions} } */
  const { chartOptions } = useChart(initialChartOptions, {
    filterState,
  });

  const handleCsvDownload = () => {
    const filename = `${filterState.data}.csv`;
    const joinedData = prepareDataForExport(chartRef.current?.chart?.series);
    exportToCsv(createCSVContent(joinedData, csvHeaders), filename);
  };

  const handleJsonDownload = () => {
    const filename = `${filterState.data}.json`;
    const joinedData = prepareDataForExport(chartRef.current?.chart?.series);
    exportToJson({ type: filterState.data, data: joinedData }, filename);
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
          <CardTitle as="h3">{tTaskD.title}</CardTitle>
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
          <FilterForm filterState={filterState} onChange={onFilterChange} />
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

export default withErrorBoundary(TaskD);
