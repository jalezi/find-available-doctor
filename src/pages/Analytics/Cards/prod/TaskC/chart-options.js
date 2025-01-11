/** @import * as Types from "../../../types" */

import { sloOBMap } from 'pages/Analytics/data/geo-json-maps';
import { defaultMapSeriesData, DEFAULTS, defaultSecondChartSeriesData, YEARS } from './data';

/** @type {Types.HighMapsOptions} */
export const mapOptions = {
  chart: {
    map: sloOBMap,
    height: 400,
    backgroundColor: 'oklch(0.98 0 0)',
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
      data: defaultMapSeriesData.map(item => ({
        ...item,
        selected: item.municipality === DEFAULTS.municipality,
      })),
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
    type: 'bar',
  },
  xAxis: {
    categories: YEARS,
  },
  yAxis: {
    title: {
      text: 'Število zavarovancev',
    },
  },
  plotOptions: {
    series: {
      stacking: 'normal',
      dataLabels: {
        enabled: true,
      },
      groupPadding: 0,
    },
  },
  tooltip: {
    shared: true,
    useHTML: true,
    // split: false,
    formatter() {
      let total = 0;
      this.points.forEach(point => {
        total += point.y;
      });
      return `<span style="font-size:11px">${this.x}</span><br/><span style="font-size:11px">Skupaj: <b>${total}</b></span><br/>${this.points
        .map(
          point =>
            `<span style="color:${point.series.color}">\u25CF</span> ${point.series.name}: <b>${point.y}</b><br/>`,
        )
        .join('')}`;
    },
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      id: 'assigned',
      name: 'opredeljeni',
      data: defaultSecondChartSeriesData.assigned,
      color: '#0d8bab',
    },
    {
      id: 'unassigned',
      name: 'neopredeljeni',
      data: defaultSecondChartSeriesData.unassigned,
      color: '#095568',
    },
  ],
};
