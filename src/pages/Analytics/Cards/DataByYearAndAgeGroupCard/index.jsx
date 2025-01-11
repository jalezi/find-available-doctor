/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

/** @import * as Types from "../../types" */
/** @import * as DataTypes from "../../data/fake-data" */

import { useEffect, useRef, useState } from 'react';

import Highcharts from 'highcharts';
import HighMaps from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import heatmap from 'highcharts/modules/heatmap';

import {
  byAgeGroupAndMunicipalityMap,
  byAgeGroupAndYearMap,
  byAgeGroupMap,
  DATA,
} from 'pages/Analytics/data/fake-data';
import stylesFilters from 'pages/Analytics/components/filters.module.css';

import { mapOptions, chartOptions } from './char-options';
import { createChartData, createSeriesDataMap, renderChart } from './utils';

import ChartHeader from '../../components/chart-header';
import { Card, CardContent } from '../../components/ui/card';

heatmap(Highcharts);

const { YEARS, AGE_GROUPS, defaults, TOOLTIP_CHART_TYPES } = DATA;

/**
 * @param {Object} props
 * @param {React.ComponentProps<"article">["id"]} props.id - The unique identifier for the chart.
 * @param {React.ComponentProps<"article">["className"]} props.className - The class name for the chart. Defaults to an empty string.
 * @returns {JSX.Element} The rendered RichInfoClick component.
 */
const DataByYearAndAgeGroupCard = function DataByYearAndAgeGroupCard({ id, className = '' }) {
  const [mapChartOptions, setMapChartOptions] = useState(mapOptions);
  const [secondChartOptions, setSecondChartOptions] = useState(chartOptions);

  /** @type {DataTypes.Year, React.Dispatch<React.SetStateAction<DataTypes.Year]} */
  const [year, setYear] = useState(defaults.year);
  /** @type {DataTypes.AgeGroup, React.Dispatch<React.SetStateAction<DataTypes.AgeGroup]} */
  const [ageGroup, setAgeGroup] = useState(defaults.ageGroup);
  /** @type {DataTypes.TooltipChartType, React.Dispatch<React.SetStateAction<DataTypes.TooltipChartType]} */
  const [tooltipChartType, setTooltipChartType] = useState(defaults.tooltipChartType);

  /** @type {React.RefObject<(Types.HighchartsReactRefObject | null)>} */
  const mapChartRef = useRef(null);

  const [init, setInit] = useState(false);

  useEffect(() => {
    // console.log('useEffect 1');
    // hack to force re-render to get the chart instance
    setInit(true);
  }, []);

  useEffect(() => {
    // console.log('useEffect 2');
    if (!init) return;
    HighMaps.addEvent(HighMaps.Tooltip, 'refresh', e => {
      if (e.target.chart.title.textStr === mapOptions.title.text) {
        renderChart(e.target.chart?.hoverPoint, tooltipChartType);
      }
    });

    // eslint-disable-next-line consistent-return
    return () => {
      HighMaps.removeEvent(HighMaps.Tooltip, 'refresh');
    };
  }, [init, tooltipChartType]);

  const onYearChange = e => {
    const newYear = Number(e.target.value);
    const data = byAgeGroupAndYearMap
      .get(ageGroup)
      .get(newYear)
      .map(item => {
        const tooltipData = byAgeGroupAndMunicipalityMap
          .get(item.ageGroup)
          .get(item.name)
          .map(i => i.value);
        return { ...item, tooltipData };
      });
    setMapChartOptions({
      series: [{ data }],
    });

    setYear(Number(newYear));
  };

  const onAgeGroupChange = e => {
    const newAgeGroup = e.target.value;
    const data = byAgeGroupAndYearMap
      .get(newAgeGroup)
      .get(year)
      .map(item => {
        const tooltipData = byAgeGroupAndMunicipalityMap
          .get(item.ageGroup)
          .get(item.name)
          .map(i => i.value);
        return { ...item, tooltipData };
      });
    setMapChartOptions({
      series: [{ data }],
    });
    setSecondChartOptions({
      series: Array.from(
        createSeriesDataMap(
          createChartData(DATA.YEARS, DATA.MUNICIPALITIES, byAgeGroupMap.get(newAgeGroup)),
        ).values(),
      ),
    });
    setAgeGroup(newAgeGroup);
  };

  const onTooltipChartTypeChange = e => {
    const newChartType = e.target.value;
    setTooltipChartType(newChartType);
  };

  return (
    <Card id={id} className={className}>
      <ChartHeader showPopover={false} title={mapOptions.title?.text} />
      <CardContent>
        <div className={stylesFilters.FiltersWrapper}>
          <label htmlFor={`${id}-year-select`}>
            Leto:{' '}
            <select id={`${id}-year-select`} name="year" onChange={onYearChange} value={year}>
              {YEARS.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={stylesFilters.FiltersWrapper}>
          <label htmlFor={`${id}-age-group-select`}>
            Skupina:{' '}
            <select
              id={`${id}-age-group-select`}
              name="ageGroup"
              value={ageGroup}
              onChange={onAgeGroupChange}
            >
              {AGE_GROUPS.map(ageGroup => (
                <option key={ageGroup} value={ageGroup}>
                  {ageGroup}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={stylesFilters.FiltersWrapper}>
          <label htmlFor="chart-type-select">
            Tip grafa:{' '}
            <select
              id="chart-type-select"
              name="chartType"
              value={tooltipChartType}
              onChange={onTooltipChartTypeChange}
            >
              {TOOLTIP_CHART_TYPES.map(type => (
                <option key={type} value={type}>
                  {type}
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
            options={mapChartOptions}
            constructorType="mapChart"
          />
        </figure>
        <figure>
          <HighchartsReact highcharts={Highcharts} options={secondChartOptions} />
        </figure>
      </CardContent>
    </Card>
  );
};

export default DataByYearAndAgeGroupCard;
