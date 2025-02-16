/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/** @import * as Types from "./types" */

import { useEffect, useMemo, useRef, useState } from 'react';

import { cx } from 'class-variance-authority';
import HighchartsReact from 'highcharts-react-official';
import HighMaps from 'highcharts/highmaps';
import { t } from 'i18next';

import { withErrorBoundary } from 'components/Shared/ErrorBoundary';
import { Card, CardContent, CardHeader, CardTitle } from 'pages/Analytics/components/ui/card';
import { Separator } from 'pages/Analytics/components/ui/separator';

import { Icon } from 'components/Shared/Icons';
import { srOnly } from 'pages/Analytics/highcharts-options/options';
import { useFilterState } from 'pages/Analytics/hooks';
import { createCSVContent, exportToCsv, exportToJson } from 'pages/Analytics/utils/download-utils';

import Scorecard from 'pages/Analytics/components/Scorecard';
import ChartActions from 'pages/Analytics/components/ChartActions';
import { mapOptions } from './chart-options';
import {
  assertSetsEqual,
  CITY_MUNICIPALITIES_LIST,
  DEFAULTS,
  uniqueOverviewDoctorTypesSet,
  uniqueOverviewMunicipalitiesSet,
  uniqueOverviewYearsSet,
} from './constants';

import { Button } from './Buttons';
import { FilterForm } from './FilterForm';
import { useMapChart } from './hooks';
import { prepareOverviewMapSeriesData } from './overview-data-util';

import styles from '../Cards.module.css';
import buttonStyles from './Buttons.module.css';
import { calculateYearlyStatistics } from './scorecards-calc-util';
import { prepareDetailLineChartSeries } from './detail-data-util';

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
  const { filterState, onFilterChange, setFilterState } = useFilterState(DEFAULTS);

  const doctorTypeTranslation = tCommon.doctorTypes[filterState.doctorType];

  const mapTitle = t('analytics.taskA.mapTitle', { suffix: tTaskA.mapTitleSuffix });
  const mapSubtitle = t('analytics.taskA.mapSubtitle', {
    doctorType: doctorTypeTranslation,
    year: filterState.year,
  });

  const [mapChartOptions, setMapChartOptions] = useState({
    ...mapOptions,
    title: { text: mapTitle },
    subtitle: { text: mapSubtitle },
    accessibility: {
      screenReaderSection: {
        beforeChartFormat: '<h4>{chartSubtitle} {chartTitle}</h4>',
      },
    },
  });

  /** @type {React.RefObject<Types.HighchartsReactRefObject>} */
  const mapRef = useRef(null);
  /** @type {React.RefObject<HTMLButtonElement>} */
  const citiesButtonRef = useRef(null);
  /** @type {React.RefObject<HTMLButtonElement>} */
  const allCitiesButtonRef = useRef(null);

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

  useEffect(() => {
    setMapChartOptions({
      series: [{ data: mapSeriesData }],
    });
  }, [mapSeriesData]);

  useEffect(() => {
    const button = citiesButtonRef.current;
    const allButton = allCitiesButtonRef.current;
    if (!button || !allButton) return;
    const isCitiesActive = assertSetsEqual(
      new Set(municipalities),
      new Set(CITY_MUNICIPALITIES_LIST),
    );
    button.setAttribute('data-state', isCitiesActive ? 'active' : 'inactive');
    button.style.pointerEvents = isCitiesActive ? 'none' : 'auto';

    const isAllCitiesActive = municipalities.length === 0;
    allButton.setAttribute('data-state', isAllCitiesActive ? 'active' : 'inactive');
    allButton.style.pointerEvents = isAllCitiesActive ? 'none' : 'auto';
  }, [municipalities]);

  const chartSeries = useMemo(
    () => prepareDetailLineChartSeries(municipalities, doctorType),
    [doctorType, municipalities],
  );

  const currentSelectedYear = Number(filterState.year);
  const stats = useMemo(
    () => calculateYearlyStatistics(currentSelectedYear, chartSeries),
    [currentSelectedYear, chartSeries],
  );

  const handleAllCitiesClick = () => {
    const button = allCitiesButtonRef.current;

    if (!button) {
      return;
    }
    const prevDataState = button.getAttribute('data-state');

    if (prevDataState === 'active') {
      return;
    }

    button.setAttribute('data-state', prevDataState === 'inactive' ? 'active' : 'inactive');
    setFilterState(prev => ({
      ...prev,
      municipalities: [],
    }));
  };

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

  const handleCsvDownload = () => {
    const filename = `map-neopredeljeni-${filterState.doctorType}.csv`;
    const data = mapSeriesData.map(item =>
      Object.assign(item, { selected: undefined, type: filterState.doctorType }),
    );
    exportToCsv(
      createCSVContent(
        data,
        Object.keys(data[0]).filter(key => !['selected', 'value', 'doctorType'].includes(key)),
      ),
      filename,
    );
  };

  const handleJsonDownload = () => {
    const filename = `map-neopredeljeni-${filterState.doctorType}.json`;
    const data = mapSeriesData.map(item => Object.assign(item, { selected: undefined }));
    exportToJson({ type: filterState.doctorType, data }, filename);
  };

  const openFullScreen = () => {
    mapRef.current.chart.fullscreen.open();
  };

  const printChart = () => {
    mapRef.current.chart.print();
  };

  return (
    <Card id={id} className={styles.CardWrapper}>
      <div className={cx(styles.Grid, styles.SingleChartGrid)}>
        <CardHeader className={styles.Header}>
          <CardTitle as="h3">{tTaskA.title}</CardTitle>
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
              municipalities: [...uniqueOverviewMunicipalitiesSet],
              years: [...uniqueOverviewYearsSet].sort((a, b) => b - a),
              doctorTypes: [...uniqueOverviewDoctorTypesSet].filter(
                v => v !== 'betterAccessibility',
              ),
            }}
          />
        </CardContent>

        <CardContent className={styles.ScorecardsWrapper}>
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
            label={tCommon.data.insuredPeopleCountWithoutIOZ}
            value={stats.currentYear.insuredPeopleCountWithoutIOZ}
            change={stats.differences.insuredPeopleCountWithoutIOZ.ratio}
          />
        </CardContent>

        <CardContent className={styles.ChartWrapper}>
          <figure>
            <HighchartsReact
              ref={mapRef}
              highcharts={HighMaps}
              constructorType="mapChart"
              options={mapChartOptions}
            />
          </figure>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button
              ref={allCitiesButtonRef}
              type="button"
              data-state="active"
              onClick={handleAllCitiesClick}
            >
              Cela Slovenija
            </Button>
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
            {filterState.municipalities.map(municipality => (
              <label key={municipality} className={buttonStyles.MunicipalityCheckbox}>
                <input
                  style={{
                    ...srOnly,
                  }}
                  type="checkbox"
                  value={municipality}
                  checked
                  onChange={e => {
                    setFilterState(prev => ({
                      ...prev,
                      municipalities: prev.municipalities.filter(m => m !== e.target.value),
                    }));
                  }}
                />
                {municipality} <Icon name="Close" width="0.5rem" height="0.5rem" />
              </label>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default withErrorBoundary(TaskA);
