/** @import * as Types from "../../types"  */

import {
  byAgeGroupAndMunicipalityMap,
  byAgeGroupAndYearMap,
  byAgeGroupMap,
  DATA,
} from 'pages/Analytics/data/fake-data';
import { sloOBMap } from 'pages/Analytics/data/geo-json-maps';

import { createChartData, createSeriesDataMap } from './utils';

const { MUNICIPALITIES, YEARS } = DATA;

/** @type {Types.HighMapsOptions} */
export const mapOptions = {
  chart: {
    map: sloOBMap,
  },
  title: {
    text: 'Neki po letih in starostnih skupinah',
  },

  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom',
      x: 10,
    },
  },
  legend: {
    enabled: true,
    align: 'right',
    verticalAlign: 'bottom',
    layout: 'vertical',
    floating: true,
    useHTML: true,
    padding: 12,
  },
  colorAxis: {
    minColor: '#AAE8F8',
    maxColor: '#095568',
    startOnTick: true,
    endOnTick: true,
  },
  tooltip: {
    useHTML: true,
    headerFormat: '',
    style: {
      opacity: 0.95,
    },
    pointFormat:
      '<div style="min-height: 300px; min-width: 300px;"><span style="font-size: 1rem;"><b>{point.name}</b></span><br><span>Skupina: <b>{point.ageGroup}</b></span><span style="margin-left: 0.5em;">Leto: <b>{point.year}</b><div id="hc-tooltip-with-chart"></div></div',
  },

  series: [
    {
      type: 'map',
      mapData: sloOBMap,
      keys: ['name', 'value'],
      joinBy: 'name',
      data: byAgeGroupAndYearMap
        .get('0-17')
        .get(DATA.defaults.year)
        .map(item => {
          const tooltipData = byAgeGroupAndMunicipalityMap
            .get(item.ageGroup)
            .get(item.name)
            .map(i => i.value);
          return { ...item, tooltipData };
        }),
    },
  ],
};

/** @type {Types.HighChartsOptions} */
export const chartOptions = {
  chart: {
    type: 'heatmap',
    height: 800,
    zoomType: 'xy',
  },
  title: {
    text: 'Municipality Data Heatmap',
  },
  xAxis: {
    categories: MUNICIPALITIES,
    events: {
      afterSetExtremes(e) {
        const { max, min, dataMax, dataMin } = e;
        const disabled = max === dataMax && min === dataMin;
        this.chart.update({ plotOptions: { series: { dataLabels: { enabled: !disabled } } } });
      },
    },
  },
  yAxis: {
    categories: YEARS,
    title: null,
  },
  colorAxis: {
    min: 0,
    minColor: '#AAE8F8',
    maxColor: '#095568',
    minorTickInterval: 0.1,
    minorTicks: true,
    minorTickLength: 0,
    tickInterval: 1,
  },
  plotOptions: {
    series: { dataLabels: { enabled: false } },
  },

  tooltip: {
    formatter() {
      const { point, series } = this;
      const xCategory = series.xAxis.categories[point.x];
      // const yCategory = series.yAxis.categories[point.y];
      const data = series.data.map(p => `${p.year}: ${p.value}`).join('<br>');
      return `<b>${xCategory}</b><br><b>Starostna skupina: ${point.ageGroup}</b><br>${data}`;
    },
  },
  // series: Array.from(chartSeriesDataMap.values()),
  series: Array.from(
    createSeriesDataMap(
      createChartData(DATA.YEARS, DATA.MUNICIPALITIES, byAgeGroupMap.get(DATA.defaults.ageGroup)),
    ).values(),
  ),
};
