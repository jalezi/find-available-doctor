import { CHART_COLORS } from 'pages/Analytics/constants';

export const COLORS = {
  public: '#ff9900',
  private: '#00cc66',
};

/** @type {Highcharts["options"]} */
export const initialChartOptions = {
  chart: {
    backgroundColor: CHART_COLORS.chart.backgroundColor,
  },
  plotOptions: {
    series: { marker: { radius: 2 } },
  },
  type: 'line',
  xAxis: {
    type: 'datetime',
    tickPositions: [], // To be dynamically set
    labels: {
      format: '{value:%Y}', // Display the year only
    },
  },
  series: [],
  yAxis: {
    useHtml: true,
  },
  tooltip: {
    xDateFormat: '%e %B %Y',
    useHtml: true,
    shared: true,
    crosshairs: true,
    backgroundColor: CHART_COLORS.tooltip.backgroundColor,
  },
};
