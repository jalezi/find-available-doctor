/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/** @import * as Types from "./types" */

import { useEffect, useMemo, useRef, useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighMaps from 'highcharts/highmaps';
import { t } from 'i18next';

import { withErrorBoundary } from 'components/Shared/ErrorBoundary';
import Scorecard from 'pages/Analytics/components/Scorecard';
import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';
import { Separator } from 'pages/Analytics/components/ui/separator';

import { mapOptions, secondChartOptions } from './chart-options';
import {
  assertSetsEqual,
  CITY_MUNICIPALITIES_LIST,
  DEFAULTS,
  uniqueOverviewDoctorTypesSet,
  uniqueOverviewMunicipalitiesSet,
  uniqueOverviewYearsSet,
} from './constants';

import styles from '../MapAndChart.module.css';
import { Button } from './Buttons';
import { prepareDetailLineChartSeries } from './detail-data-util';
import { FilterForm } from './FilterForm';
import { useMapChart } from './hooks';
import { prepareOverviewMapSeriesData } from './overview-data-util';
import { calculateYearlyStatistics } from './scorecards-calc-util';

const COLORS = Object.freeze({
  minColor: '#E57373',
  maxColor: '#81C784',
  selectColor: '#ffa500',
});

/**
 * TaskA component
 * A card component that displays the TaskA card.
 * It uses the Card component from the ui folder.
 * @param {string} id - The ID of the taskA card.
 * @returns {JSX.Element} The rendered TaskA component.
 */
const TaskA = function TaskA({ id }) {
  const tTaskA = t('analytics.taskA', { returnObjects: true });
  const tCommon = t('analytics.common', { returnObjects: true });
  const [init, setInit] = useState(false);
  const [filterState, setFilterState] = useState(DEFAULTS);
  const [mapChartOptions, setMapChartOptions] = useState({
    ...mapOptions,
    title: { text: tTaskA.mapTitle },
  });
  const [chartOptions, setChartOptions] = useState({
    ...secondChartOptions,
    title: { text: tTaskA.chartTitle },
  });
  /** @type {React.RefObject<Types.HighchartsReactRefObject>} */
  const mapRef = useRef(null);
  /** @type {React.RefObject<HTMLButtonElement>} */
  const citiesButtonRef = useRef(null);

  const [colors, setColors] = useState({ ...COLORS });

  useEffect(() => {
    setInit(true);
  }, []);

  useMapChart(
    {
      setMapChartOptions,
      setFilterState,
      init,
      mapChart: mapRef.current?.chart,
    },
    [init],
  );

  const { municipalities, doctorType } = filterState;

  const mapSeriesData = useMemo(() => prepareOverviewMapSeriesData(filterState), [filterState]);
  const chartSeries = useMemo(
    () => prepareDetailLineChartSeries(municipalities, doctorType),
    [doctorType, municipalities],
  );

  useEffect(() => {
    setMapChartOptions({
      series: [{ data: mapSeriesData }],
    });

    setChartOptions({
      series: chartSeries,
    });
  }, [chartSeries, mapSeriesData]);

  useEffect(() => {
    const button = citiesButtonRef.current;
    if (!button) return;
    const isCitiesActive = assertSetsEqual(
      new Set(municipalities),
      new Set(CITY_MUNICIPALITIES_LIST),
    );
    button.setAttribute('data-state', isCitiesActive ? 'active' : 'inactive');
  }, [municipalities]);

  useEffect(() => {
    setMapChartOptions(() => ({
      colorAxis: {
        minColor: colors.minColor,
        maxColor: colors.maxColor,
      },
      series: [
        {
          states: {
            select: {
              color: colors.selectColor,
            },
          },
        },
      ],
    }));
  }, [colors, setMapChartOptions]);

  const onColorChange = e => {
    const { name, value } = e.target;
    setColors({ ...colors, [name]: value });
  };

  const onFilterChange = e => {
    const { name, value } = e.target;

    const newValue = name === 'year' ? Number(value) : value;
    setFilterState({ ...filterState, [name]: newValue });
  };

  const currentSelectedYear = Number(filterState.year);
  const stats = useMemo(
    () => calculateYearlyStatistics(currentSelectedYear, chartSeries),
    [currentSelectedYear, chartSeries],
  );

  const handleCityMunicipalitiesClick = () => {
    const button = citiesButtonRef.current;

    if (!button) {
      return;
    }
    const prevDataState = button.getAttribute('data-state');
    button.setAttribute('data-state', prevDataState === 'inactive' ? 'active' : 'inactive');
    setFilterState(prev => ({
      ...prev,
      municipalities: prevDataState === 'inactive' ? CITY_MUNICIPALITIES_LIST : [],
    }));
  };

  return (
    <Card id={id} className={styles.MapAndChart}>
      <div className={styles.Grid}>
        <CardHeader className={styles.Header}>
          <CardTitle>{tTaskA.title}</CardTitle>
        </CardHeader>
        <Separator style={{ gridArea: 'separator' }} />
        <CardContent className={styles.FiltersContainer}>
          <FilterForm
            filterState={filterState}
            onChange={onFilterChange}
            filterOptions={{
              municipalities: [...uniqueOverviewMunicipalitiesSet],
              years: [...uniqueOverviewYearsSet].sort((a, b) => b - a),
              doctorTypes: [...uniqueOverviewDoctorTypesSet],
            }}
          />
        </CardContent>
        <CardContent>
          <h3>Nastavitve zemljevida</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label>
              min:{' '}
              <input
                type="color"
                value={colors.minColor}
                onChange={onColorChange}
                name="minColor"
              />
            </label>
            <label>
              max:{' '}
              <input
                type="color"
                value={colors.maxColor}
                onChange={onColorChange}
                name="maxColor"
              />
            </label>
            <label>
              izbor:{' '}
              <input
                type="color"
                value={colors.selectColor}
                onChange={e => setColors({ ...colors, selectColor: e.target.value })}
                name="selectColor"
              />
            </label>
            <button type="button" onClick={() => setColors({ ...COLORS })}>
              Reset
            </button>
          </div>
        </CardContent>
        <CardContent className={styles.ScorecardsContainer}>
          <Scorecard
            valueLabel={filterState.year}
            changeLabel={filterState.year - 1}
            scorecardType="description"
          />
          <Scorecard
            label={tCommon.data.insuredPeopleCount}
            value={stats.currentYear.insuredPeopleCount}
            change={stats.differences.insuredPeopleCount.ratio}
          />
          <Scorecard
            label={tCommon.data.insuredPeopleCountWithIOZ}
            value={stats.previousYear.insuredPeopleCount}
            change={stats.differences.insuredPeopleCountWithIOZ.ratio}
          />
        </CardContent>
        <CardContent className={styles.MapContainer}>
          <figure>
            <HighchartsReact
              ref={mapRef}
              highcharts={HighMaps}
              constructorType="mapChart"
              options={mapChartOptions}
            />
          </figure>
          <div>
            <Button
              ref={citiesButtonRef}
              type="button"
              onClick={handleCityMunicipalitiesClick}
              data-state="inactive"
            >
              {citiesButtonRef.current?.getAttribute('data-state') === 'inactive'
                ? tCommon.buttons.cityMunicipalitiesInactive
                : tCommon.buttons.cityMunicipalitiesActive}
            </Button>
          </div>
        </CardContent>
        <CardContent className={styles.ChartContainer}>
          <CardTitle variant="subtitle">{tTaskA.chartTitle}</CardTitle>
          <CardTitle variant="description">{tCommon.doctorTypes[filterState.doctorType]}</CardTitle>
          <figure>
            <HighchartsReact
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

export default withErrorBoundary(TaskA);
