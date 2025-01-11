/** @import * as Types from "../../../types" */

import { renderToString } from 'react-dom/server';

import { sloOBMap } from 'pages/Analytics/data/geo-json-maps';
import { uniqueOverviewYearsSet } from './constants';
import { prepareDetailLineChartSeries } from './detail-data-util';
import { LineChartTooltip, LineChartYAxisTitle } from './LineChartComponents';
import { MapChartTooltip } from './MapChartTooltip';
import { prepareOverviewMapSeriesData } from './overview-data-util';

/** @type {Types.HighMapsOptions} */
export const mapOptions = {
  chart: {
    map: sloOBMap,
    height: 400,
    backgroundColor: 'oklch(0.98 0 0)',
  },
  legend: {
    enabled: false,
  },
  colorAxis: {
    minColor: '#E57373',
    maxColor: '#81C784',
    startOnTick: true,
    endOnTick: true,
  },
  tooltip: {
    useHTML: true,
    headerFormat: '',
    backgroundColor: 'oklch(1 0 0 / 0.8)',
    formatter() {
      return renderToString(<MapChartTooltip point={this.point} />);
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
      data: prepareOverviewMapSeriesData(),
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
    backgroundColor: 'oklch(0.98 0 0)',
  },
  xAxis: {
    categories: [...uniqueOverviewYearsSet].sort((a, b) => a - b),
    crosshair: true,
  },
  yAxis: {
    useHTML: true,
    title: {
      text: renderToString(<LineChartYAxisTitle />),
    },
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  series: prepareDetailLineChartSeries(),
  tooltip: {
    shared: true,
    useHTML: true,
    backgroundColor: 'oklch(1 0 0 / 0.8)',
    formatter() {
      return renderToString(<LineChartTooltip points={this.points} x={this.x} />);
    },
  },
};
