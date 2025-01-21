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

import { Icon } from 'components/Shared/Icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'pages/Analytics/components/ui/dropdown-menu';
import { createCSVContent, exportToCsv, exportToJson } from 'pages/Analytics/utils/download-utils';
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

  const { chartOptions } = useChart(options, { filterState });

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

  return (
    <Card id={id} className={styles.CardWrapper}>
      <div className={cx(styles.Grid, styles.SingleChartGrid)}>
        <CardHeader className={styles.Header}>
          <CardTitle as="h3">{tTaskSpecial.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" aria-label="Options" className={styles.IconButton}>
                <Icon name="VerticalDots" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel>Export</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <button type="button" onClick={handleCsvDownload} style={{ width: '100%' }}>
                    CSV
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button type="button" onClick={handleJsonDownload} style={{ width: '100%' }}>
                    JSON
                  </button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
