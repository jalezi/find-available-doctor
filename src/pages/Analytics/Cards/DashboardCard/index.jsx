/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */

/** @import * as DataTypes from "../../data-lower-case/fake-data"  */

import { useEffect, useRef, useState } from 'react';

import { cx } from 'class-variance-authority';
import Highcharts from 'highcharts';
import HighMaps from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';

import Scorecard from 'pages/Analytics/components/Scorecard';
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from 'pages/Analytics//components/ui/card';
import { Separator } from 'pages/Analytics/components/ui/separator';

import { notSrOnly } from 'pages/Analytics/highcharts-options/options';
import { byAgeGroupMap, byMunicipalityMap, DATA } from 'pages/Analytics/data-lower-case/fake-data';

import { baseSecondChartOptions, mapOptions } from './chart-options';

import { filterDataByYearAndAgeGroup } from '../DataByYearAndAgeGroupCard/utils';

import styles from './DashboardCard.module.css';

const defaultMunicipality = 'Ljubljana';

/**
 * DashboardCard component renders children wrapped in a div or article.
 * @param {Object} props - The properties object.
 * @param {React.ComponentProps<"article">["id"]} props.id - The unique identifier for the card.
 * @param {React.ComponentProps<"article">["className"]} props.className - The class name for the card. Defaults to an empty string.
 * @returns {JSX.Element} The rendered ChartCard component.
 */
const DashboardCard = function DashboardCard({ id = undefined, className = '' }) {
  /** @type {React.RefObject<(Types.HighchartsReactRefObject | null)>} */
  const mapChartRef = useRef(null);

  const [mapChartOptions, setMapChartOptions] = useState(mapOptions);

  /** @type {DataTypes.Year, React.Dispatch<React.SetStateAction<DataTypes.Year]} */
  const [year, setYear] = useState(DATA.defaults.year);
  /** @type {DataTypes.AgeGroup, React.Dispatch<React.SetStateAction<DataTypes.AgeGroup]} */
  const [ageGroup, setAgeGroup] = useState(DATA.defaults.ageGroup);

  const [, setInit] = useState(false);

  useEffect(() => {
    // console.log('useEffect 1');
    // hack to force re-render to get the chart instance
    setInit(true);
  }, []);

  const onYearChange = e => {
    const newYear = Number(e.target.value);
    const data = filterDataByYearAndAgeGroup({
      dataMap: byAgeGroupMap,
      year: newYear,
      ageGroup,
    });
    setMapChartOptions({
      series: [{ data }],
    });
    setYear(Number(newYear));
  };

  const onAgeGroupChange = e => {
    const newAgeGroup = e.target.value;
    const data = filterDataByYearAndAgeGroup({
      dataMap: byAgeGroupMap,
      year,
      ageGroup: newAgeGroup,
    });
    setMapChartOptions({
      series: [{ data }],
    });
    setAgeGroup(newAgeGroup);
  };

  const municipalityData = byMunicipalityMap.get(defaultMunicipality);

  return (
    <Card id={id} className={cx(styles.DashboardCard, className)}>
      <CardHeader>
        <div>
          <CardTitle>Naslov 1</CardTitle>
          <CardTitle variant="subtitle">Naslov 2</CardTitle>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className={styles.Body}>
        <div className={cx(styles.FirstColumn, styles.Filters)}>
          <div style={{ display: 'inline-block' }}>
            <label htmlFor={`${id}-year-select`}>
              Leto:{' '}
              <select
                id={`${id}-year-select`}
                name="year"
                onChange={onYearChange}
                value={year}
                style={{ padding: '0.25em 1em', borderRadius: '0.25em' }}
              >
                {DATA.YEARS.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div style={{ display: 'inline-block' }}>
            <label htmlFor={`${id}-age-group-select`}>
              Skupina:{' '}
              <select
                id={`${id}-age-group-select`}
                name="ageGroup"
                value={ageGroup}
                onChange={onAgeGroupChange}
                style={{ padding: '0.25em 1em', borderRadius: '0.25em' }}
              >
                {DATA.AGE_GROUPS.map(ageGroup => (
                  <option key={ageGroup} value={ageGroup}>
                    {ageGroup}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className={cx(styles.FirstColumn, styles.MapFigureWrapper)}>
          <figure className={cx(styles.MapFigure)}>
            <HighchartsReact
              ref={mapChartRef}
              highcharts={HighMaps}
              options={mapChartOptions}
              constructorType="mapChart"
            />
          </figure>
        </div>
        <div className={cx(styles.SecondColumn, styles.Cumulative)}>
          <div>
            <Scorecard
              scorecardType="description"
              valueLabel="value label"
              changeLabel="change label"
            />
          </div>
          <div className={styles.Scorecards}>
            <Scorecard label="trend up" value={175} change={2} changeDirection="up" />
            <Scorecard label="trend down" value={1.75} change={0.45} changeDirection="down" />
            <Scorecard label="trend same" value={17.52} change={0} changeDirection="no" />
          </div>
        </div>
        <div className={cx(styles.SecondColumn, styles.LineChartsWrapper)}>
          {[...municipalityData.entries()].slice(0, 2).map(([ageGroup, data]) => (
            <div key={ageGroup} className={cx(styles.LineChartFigureWrapper)}>
              <figure key={ageGroup} className={cx(styles.ChartFigure)}>
                <HighchartsReact
                  key={ageGroup}
                  highcharts={Highcharts}
                  options={{
                    ...baseSecondChartOptions,
                    title: {
                      text: ageGroup,
                      style: {
                        ...notSrOnly,
                      },
                    },
                    series: {
                      data: data.map(item => ({
                        y: item.value,
                        x: item.year,
                        name: item.name,
                        ageGroup: item.ageGroup,
                      })),
                      dataLabels: {
                        enabled: true,
                      },
                      title: null,
                      color: '#5DA9B5',
                    },
                  }}
                />
              </figure>
            </div>
          ))}
        </div>

        <table className={styles.FirstColumn}>table 1</table>
        <table className={styles.SecondColumn}>table 2</table>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
