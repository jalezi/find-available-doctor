/** @import * as Types from "../../../types" */

import { sloOBMap } from 'pages/Analytics/data/geo-json-maps';
import { defaultDetailLineChartSeries, defaultOverviewMapSeriesData, uniqueYearsSet } from './data';

/** @type {Types.HighMapsOptions} */
export const mapOptions = {
  chart: {
    map: sloOBMap,
    height: 400,
  },
  title: {
    text: 'Število zavarovancev in opredeljenost po starostnih skupinah',
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
    formatter() {
      return `
        <b>${this.point.name}</b><br>
        <b>${this.point.year}</b><br>
        <b>doctorType:</b> ${this.point.doctorType}<br>
        <b>iozRatio:</b> ${this.point.iozRatio}<br>
        <b>insuredPeopleCount:</b> ${this.point.insuredPeopleCount}<br>
        <b>insuredPeopleCountWithIOZ:</b> ${this.point.insuredPeopleCountWithIOZ}<br>
      `;
    },
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      id: 'municipalities',
      type: 'map',
      mapData: sloOBMap,
      joinBy: ['name', 'municipality'],
      data: defaultOverviewMapSeriesData,
      cursor: 'pointer',
      allowPointSelect: true,
      states: {
        select: {
          color: '#ffa500',
          borderColor: '#000000',
        },
      },
      borderWidth: 0.5,
    },
  ],
};

/** @type {Types.HighchartsOptions} */
export const secondChartOptions = {
  chart: {
    type: 'line',
  },
  xAxis: {
    categories: [...uniqueYearsSet].sort((a, b) => a - b),
    crosshair: true,
  },
  yAxis: {
    title: {
      text: 'neki',
    },
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  series: defaultDetailLineChartSeries,
  tooltip: {
    shared: true,
    useHTML: true,
    formatter() {
      return this.points.reduce(
        (s, point) => `${s}<br/>${point.series.name}: <b>${point.y.toFixed(2)}</b>`,
        `<b>${this.key}</b>`,
      );
    },
  },
};
