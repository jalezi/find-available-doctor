/** @import * as Types from "../../types" */

import {
  // byAgeGroupAndMunicipalityMap,
  byAgeGroupAndYearMap,
  DATA,
} from 'pages/Analytics/data/fake-data';
import { sloOBMap } from 'pages/Analytics/data/geo-json-maps';

/** @type {Types.HighMapsOptions} */
export const mapOptions = {
  chart: {
    map: sloOBMap,
    height: 400,
  },
  title: {
    text: 'Neki Kristof',
  },

  legend: {
    enabled: false,
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
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      type: 'map',
      mapData: sloOBMap,
      keys: ['name', 'value'],
      joinBy: 'name',
      data: byAgeGroupAndYearMap.get('0-17').get(DATA.defaults.year),
    },
  ],
  responsive: {},
};
/** @type {Types.HighchartsOptions} */
export const baseSecondChartOptions = {
  chart: {
    type: 'line',
    height: 200,
  },
  credits: {
    enabled: false,
  },
  legend: { enabled: false },
  tooltip: {
    split: false,
    shared: true,
    useHTML: true,
    format: '<b>{point.name}</b><br>{point.ageGroup}:{point.y}',
  },
  plotOptions: {
    series: {
      events: {},
    },
  },

  xAxis: {
    minTickInterval: 1,
    tickPixelInterval: 50,
    crosshair: true,
    categories: DATA.YEARS,
  },
  yAxis: {
    title: {
      text: null,
    },
  },
  series: [],
};
