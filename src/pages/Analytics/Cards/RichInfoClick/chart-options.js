/* eslint-disable no-plusplus */
/** @import * as Types from "../../types"  */

import { byAgeGroupAndMunicipalityMap, byYearAndAgeGroupMap } from 'pages/Analytics/data/fake-data';
import { sloOBMap } from 'pages/Analytics/data/geo-json-maps';

import { dimensions } from '../../highcharts-options/options';

/**
 * @typedef {Object} DataItem
 * @property {string} name
 * @property {number} value
 * @property {string} OB_UIME
 * @property {number} year
 */

/**
 * @typedef {Object} SeriesDataItem
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} SeriesItem
 * @property {string} id
 * @property {string} name
 * @property {SeriesDataItem[]} data
 */

export const firstChartSeriesMap = byYearAndAgeGroupMap;

export const yearsSortedDesc = Array.from(firstChartSeriesMap.keys())
  .filter(v => !Number.isNaN(v))
  .sort((a, b) => b - a);

/** @type {Types.HighMapsOptions} */
export const mapOptions = {
  chart: {
    map: sloOBMap,
    spacing: 1,
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
  title: {
    text: 'Neki po občinah',
  },
  subtitle: {
    text: 'Klikni na občino za dodatne informacije',
  },
  tooltip: {
    footerFormat: '<span style="font-size: 10px">(Click for details)</span>',
  },
  colorAxis: {
    minColor: '#AAE8F8',
    maxColor: '#095568',
    startOnTick: true,
    endOnTick: true,
    // type: 'logarithmic', can not use logarithmic scale with negative values and 0; use linear scale instead
  },
  responsive: {
    rules: [
      {
        condition: {
          minWidth: dimensions.breakpoints.sm,
        },
        chartOptions: {
          chart: {
            height: dimensions.height.md,
          },
        },
      },
      {
        condition: {
          maxWidth: dimensions.breakpoints.sm,
        },
        chartOptions: {
          chart: {
            height: dimensions.height.sm,
          },
          legend: {
            enabled: true,
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal',
            floating: false,
            useHTML: true,
          },
        },
      },
    ],
  },
  series: [
    {
      type: 'map',
      name: 'Slo OB Data',
      mapData: sloOBMap,
      keys: ['name', 'value'],
      joinBy: 'name',
      data: firstChartSeriesMap.get(yearsSortedDesc[0]).get('0-17'),
      allowPointSelect: true,
      cursor: 'pointer',
      states: {
        select: {
          color: '#95C83F',
          borderColor: 'black',
          dashStyle: 'shortdot',
        },
      },
      borderWidth: 0.5,
      dataLabels: {
        enabled: true,
        format: '{point.properties.OB_UIME}',
        style: {
          textOutline: 'none',
        },
      },
    },
  ],
};

export const secondChartSeriesMap = byAgeGroupAndMunicipalityMap.get('0-17');

/** @type {Types.HighchartsOptions} */
export const baseSecondChartOptions = {
  chart: {
    type: 'area',
    height: dimensions.height.md,
  },
  credits: {
    enabled: false,
  },
  legend: { enabled: false },
  tooltip: {
    split: false,
    shared: true,
    useHTML: true,
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
  },

  series: [],
};
