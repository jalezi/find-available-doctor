/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/** @import * as Types from '../../types' */
import { useEffect, useMemo, useRef, useState } from 'react';

import { cx } from 'class-variance-authority';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighMaps from 'highcharts/highmaps';

import ChartHeader from '../../components/chart-header';
import CustomSeriesButtons from '../../components/CustomSeriesButtons';
import { Card, CardContent } from '../../components/ui/card';
import {
  baseSecondChartOptions,
  firstChartSeriesMap,
  mapOptions,
  secondChartSeriesMap,
  yearsSortedDesc,
} from './chart-options';

import stylesFilters from '../../components/filters.module.css';
import styles from '../Cards.module.css';
import stylesRichInfoClick from './RichInfoClick.module.css';

/**
 *
 * @param {React.ComponentProps<"article">["id"]} props.id - The unique identifier for the chart.
 * @param {React.ComponentProps<"article">["className"]} props.className - The class name for the chart. Defaults to an empty string.
 * @returns {JSX.Element} The rendered RichInfoClick component.
 */
const RichInfoClick = function RichInfoClick({ id = undefined, className = '' }) {
  /** @type {[string, React.Dispatch<React.SetStateAction<Highcharts.Point[]>>]} */
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [mapChartOptions, setMapChartOptions] = useState(mapOptions);
  const [secondChartOptions, setSecondChartOptions] = useState(baseSecondChartOptions);
  const [isInit, setInit] = useState(false);
  const [customSeriesButtonsKey, setCustomSeriesButtonKey] = useState('');

  /** @type {React.RefObject<(Types.HighchartsReactRefObject | null)>} */
  const mapChartRef = useRef(null);
  const mapChart = mapChartRef.current?.chart;

  /** @type {React.RefObject<(Types.HighchartsReactRefObject | null)>} */
  const secondChartRef = useRef(null);
  const secondChart = secondChartRef.current?.chart;

  const selectedPointsLength = selectedPoints.length;

  const secondChartSeries = useMemo(
    () =>
      selectedPoints.map(name => ({
        id: name,
        name,
        data: secondChartSeriesMap.get(name).map(item => ({ x: item.year, y: item.value })),
      })),
    [selectedPoints],
  );

  useEffect(() => {
    // console.log('useEffect 1');
    // hack to force re-render to get the chart instance
    setInit(true);
  }, []);

  useEffect(() => {
    // console.log('useEffect 2');
    if (isInit) {
      setMapChartOptions({
        plotOptions: {
          series: {
            point: {
              events: {
                select() {
                  setSelectedPoints(mapChart.getSelectedPoints().map(p => p.name));
                },
                unselect() {
                  setSelectedPoints(mapChart.getSelectedPoints().map(p => p.name));
                },
              },
            },
          },
        },
      });
    }
    setSecondChartOptions({
      chart: {
        events: {
          redraw(e) {
            setCustomSeriesButtonKey(e.target.series?.map(s => s.name).join(', ') ?? ''); // hack to force re-render CustomSeriesButtons component
          },
        },
      },
    });
  }, [isInit, mapChart]);

  useEffect(() => {
    // console.log('useEffect 3');
    if (!secondChart) {
      return;
    }
    if (selectedPointsLength === 0) {
      setSecondChartOptions({ series: [] });
      return;
    }
    setSecondChartOptions({
      series: secondChartSeries,
      chart: { type: selectedPointsLength > 1 ? 'spline' : 'area' },
    });
  }, [secondChart, selectedPointsLength, secondChartSeries]);

  const onYearChange = e => {
    const newYear = Number(e.target.value);
    const newSeries = firstChartSeriesMap
      .get(newYear)
      .get('0-17')
      .map(item => ({
        ...item,
        selected: selectedPoints.includes(item.name),
        id: item.name,
      }));

    setMapChartOptions({
      series: [{ data: newSeries }],
    });
  };

  return (
    <Card id={id} className={cx(stylesRichInfoClick.RichInfoClick, className)} as="article">
      <ChartHeader showPopover={false} title={mapOptions.title.text} />
      <CardContent>
        <div className={stylesFilters.FiltersWrapper}>
          <label htmlFor="year-select">
            Leto:{' '}
            <select id="year-select" name="year-select" onChange={onYearChange}>
              {yearsSortedDesc.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
      </CardContent>
      <CardContent>
        <figure>
          <HighchartsReact
            ref={mapChartRef}
            highcharts={HighMaps}
            constructorType="mapChart"
            options={mapChartOptions}
          />
          <figcaption className="highcharts-description">Caption map</figcaption>
        </figure>
        <figure
          className={cx(stylesRichInfoClick.SecondFigure, {
            [stylesRichInfoClick.Expanded]: selectedPointsLength > 0,
          })}
        >
          <div>
            <h3>
              {selectedPointsLength > 1
                ? 'Primerjaj po občinah'
                : (selectedPoints[0]?.name ?? 'Klikni na občino za prikaz podatkov')}
            </h3>
            <p>
              <kbd>Shift</kbd> + <kbd>klik</kbd> za več občin
            </p>
          </div>
          <HighchartsReact
            ref={secondChartRef}
            highcharts={Highcharts}
            options={secondChartOptions}
          />
          <div className={styles.SeriesButtons}>
            <CustomSeriesButtons key={customSeriesButtonsKey} chart={secondChart} />
          </div>
          <figcaption className="highcharts-description">Caption second chart</figcaption>
        </figure>
      </CardContent>
    </Card>
  );
};

export default RichInfoClick;
