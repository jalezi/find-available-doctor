/* eslint-disable react/prop-types */
/** @import * as DataTypes from "../../data/fake-data" */

import React, { useState, useMemo, useRef } from 'react';

import Highcharts from 'highcharts';
import HighMaps from 'highcharts/highmaps';
import { merge as loMerge } from 'lodash';

import { PauseIcon, PlayArrowIcon } from 'components/Shared/Icons';
import { byMunicipalityAndAgeGroupMap } from 'pages/Analytics/data/fake-data';
import HighchartsReactComponent from 'pages/Analytics/components/HighchartReactComponent';

import { mapOptions as baseMapOptions } from './chart-options';
import styles from './MotionCardHighMap.module.css';

/**
 * @param {Object} props
 * @param {Map<DataTypes<DataTypes.Year, DataTypes.AgeGroupItem[]} props.data - The data for the chart.
 * @param {DataTypes.AgeGroup} props.ageGroup - The age group to display.
 */
const MotionCardHighMap = function MotionCardHighMap({ data, ageGroup }) {
  const mapChartRef = useRef();
  const intervalIdRef = useRef(null);
  /** @type {React.MutableRefObject<HTMLInputElement>} */
  const buttonRef = useRef();

  const [yearIndex, setYearIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const years = useMemo(() => Array.from(data.keys()).sort((a, b) => a - b), [data]);

  const [mapOptions, setMapOptions] = useState(
    loMerge(
      { title: { text: ageGroup }, series: [{ data: data.get(years[yearIndex]) }] },
      baseMapOptions,
    ),
  );

  const mun1 = useMemo(
    () =>
      byMunicipalityAndAgeGroupMap
        .get('Ljubljana')
        .get(ageGroup)
        .map(item => item.value),
    [ageGroup],
  );
  const mun2 = useMemo(
    () =>
      byMunicipalityAndAgeGroupMap
        .get('Maribor')
        .get(ageGroup)
        .map(item => item.value),
    [ageGroup],
  );

  const [chartOptions] = useState({
    title: {
      text: 'Comparing chart',
      // height: 300,
    },
    chart: {
      type: 'line',
    },
    xAxis: {
      categories: years,
    },
    series: [
      { name: 'Ljubljana', data: mun1 },
      { name: 'Maribor', data: mun2 },
    ],
    tooltip: {
      shared: true,
      useHTML: true,
      split: false,
    },
  });

  const onYearChange = e => {
    const value = parseInt(e.target.value, 10);
    setYearIndex(value);
    if (isPlaying) {
      return;
    }
    const year = years[value];
    const serieData = data.get(year);
    setMapOptions({
      series: [{ data: serieData }],
    });
    e.target.style.setProperty('--slider-value', `${(value / (years.length - 1)) * 100}%`);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      clearInterval(intervalIdRef.current);
      setIsPlaying(false);
      return;
    }
    const id = setInterval(() => {
      setYearIndex(prevYearIndex => {
        const newYearIndex = (prevYearIndex + 1) % years.length;
        const year = years[newYearIndex];
        const serieData = data.get(year);
        setMapOptions({
          series: [{ data: serieData }],
        });
        if (newYearIndex === 0) {
          clearInterval(id);
          setIsPlaying(false);
        }
        setYearIndex(newYearIndex);
      });
    }, 500);
    intervalIdRef.current = id;
    setIsPlaying(true);
  };

  buttonRef.current?.style.setProperty(
    '--slider-value',
    `${(yearIndex / (years.length - 1)) * 100}%`,
  );

  return (
    <div className={styles.Wrapper}>
      <HighchartsReactComponent
        ref={mapChartRef}
        highcharts={HighMaps}
        options={mapOptions}
        constructorType="mapChart"
        containerProps={{ className: styles.Map }}
      />

      <HighchartsReactComponent highcharts={Highcharts} options={chartOptions} />
      <div className={styles.Controls}>
        <output
          id={`${ageGroup}-play-output`}
          htmlFor={`${ageGroup}-play-range`}
          name="year"
          className={styles.Output}
        >
          {years[yearIndex]}
        </output>
        <div className={styles.PlayControls}>
          <button
            type="button"
            id={`${ageGroup}-play-pause-button`}
            title="play"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'pause' : 'play'}
            className={styles.PlayButton}
            data-playing={isPlaying || undefined}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </button>
          <label
            htmlFor={`${ageGroup}-play-range`}
            className={styles.Label}
            id={`${ageGroup}-play-range-label`}
          >
            Leto
          </label>
          <input
            ref={buttonRef}
            id={`${ageGroup}-play-range`}
            name={`${ageGroup}-play-range`}
            type="range"
            value={yearIndex}
            onChange={onYearChange}
            min="0"
            max={`${years.length - 1}`}
            className={styles.Range}
            list={`${ageGroup}-play-range-tickmarks`}
          />
        </div>
      </div>
    </div>
  );
};

export default MotionCardHighMap;
