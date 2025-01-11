/** @import * as DataTypes from "./data" */

import Highcharts from 'highcharts';

import { byAgeGroupMap, DATA } from 'pages/Analytics/data/fake-data';

export function renderChart(point, chartType) {
  Highcharts.chart('hc-tooltip-with-chart', {
    chart: {
      type: chartType,
      height: 270,
      backgroundColor: 'transparent',
    },

    xAxis: {
      categories: DATA.YEARS,
      title: {
        text: null,
      },
    },
    yAxis: {
      title: { text: null },
    },

    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        data: point.options.tooltipData,
        dataLabels: {
          enabled: true,
        },
        title: null,
        color: '#5DA9B5',
      },
    ],
  });
}

/**
 * Filters data by the selected year and age group.
 * @param {Object} props
 * @param {Map<DataTypes.AgeGroup, DataTypes.AgeGroupItem[]>} props.dataMap - The data map to filter.
 * @param {DataTypes.Year} props.year - The selected year.
 * @param {DataTypes.AgeGroup} props.ageGroup - The selected age group.
 * @returns {(DataTypes.AgeGroupItem & {tooltipData: number})[]} - The filtered data.
 */
export function filterDataByYearAndAgeGroup({ dataMap, year, ageGroup }) {
  const data = dataMap.get(ageGroup);
  return data
    .filter(item => item.year === year)
    .map(item => {
      const tooltipData = byAgeGroupMap
        .get(item.ageGroup)
        .filter(i => i.name === item.name)
        .map(i => i.value);
      return { ...item, tooltipData };
    });
}

/**
 * Creates a chart data array for the heatmap.
 * @param {DataTypes.Year[]} years - The years array.
 * @param {string[]} municipalities - The municipalities array.
 * @param {DataTypes.AgeGroupItem[]} items - The items array.
 * @returns {(DataTypes.AgeGroupItem & {x: number, y: number})[]} - The chart data array.
 */
export function createChartData(years, municipalities, items) {
  return items.map(item => {
    const x = municipalities.indexOf(item.name);
    const y = years.indexOf(item.year);
    if (x === -1 || y === -1) {
      return null;
    }

    return {
      x,
      y,
      name: item.name,
      value: item.value,
      ageGroup: item.ageGroup,
      year: item.year,
    };
  });
}

/**
 * Creates a map of series data.
 * @param {(DataTypes.AgeGroupItem & {x: number, y: number})[]} data - The data array.
 * @returns {Map<string, {name: string, borderWidth: number, data: (DataTypes.AgeGroupItem & {x: number, y: number})[]}>} - The series data map.
 */
export function createSeriesDataMap(data) {
  const seriesMap = new Map();
  data.forEach(item => {
    if (seriesMap.has(item.name)) {
      const serie = seriesMap.get(item.name);
      serie.data.push(item);
      seriesMap.set(item.name, serie);
      return;
    }
    seriesMap.set(item.name, {
      name: item.name,
      borderWidth: 0,
      data: [item],
    });
  });
  return seriesMap;
}
