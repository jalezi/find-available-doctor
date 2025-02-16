/** @import * as Types from "../../types" */

import { renderToString } from 'react-dom/server';

import { CHART_COLORS } from 'pages/Analytics/constants';
import { sloOBMap } from 'pages/Analytics/data/geo-json-maps';
import { uniqueOverviewYearsSet } from './constants';
import { prepareDetailLineChartSeries } from './detail-data-util';
import { LineChartTooltip, LineChartYAxisTitle } from './LineChartComponents';
import { MapChartTooltip } from './MapChartTooltip';
import { prepareOverviewMapSeriesData } from './overview-data-util';

export const COLORS = Object.freeze({
  minColor: '#E57373',
  maxColor: '#D8E8D8',
  selectColor: '#f8a808',
  selectBorderColor: '#000000',
});

/** @type {Types.HighMapsOptions} */
export const mapOptions = {
  chart: {
    map: sloOBMap,
    height: 600,
    backgroundColor: CHART_COLORS.chart.backgroundColor,
  },
  legend: {
    enabled: true,
  },
  colorAxis: {
    minColor: COLORS.minColor,
    maxColor: COLORS.maxColor,
    startOnTick: true,
    endOnTick: true,
  },
  tooltip: {
    useHTML: true,
    headerFormat: '',
    backgroundColor: CHART_COLORS.tooltip.backgroundColor,
    formatter() {
      return renderToString(<MapChartTooltip point={this.point} />);
    },
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
          color: COLORS.selectColor,
          borderColor: COLORS.selectBorderColor,
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
    backgroundColor: CHART_COLORS.chart.backgroundColor,
  },
  plotOptions: {
    series: { marker: { radius: 2 } },
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
    enabled: true,
  },
  series: prepareDetailLineChartSeries(),
  tooltip: {
    shared: true,
    useHTML: true,
    backgroundColor: CHART_COLORS.tooltip.backgroundColor,
    formatter() {
      return renderToString(<LineChartTooltip points={this.points} x={this.x} />);
    },
  },
};
