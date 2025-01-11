/** @import * as Types from "../../types" */

import Highcharts from 'highcharts';
import getTrendLine from '../utils/getTrendline';

const datasetPrivate = [
  [5.896819161743402, 3372.1936129712194],
  [5.463782314232986, 3956.6672675724185],
  [4.0564125598241425, 3789.6747948292177],
  [4.0564125598241425, 23789.6747948292177],
  [3.2985980766809178, 3873.1710312008145],
  [3.2985980766809178, 43873.1710312008145],
  [2.7573020172929006, 8047.982849780827],
  [6.13900467860018, 5229.110813146421],
  [7.13900467860018, 5249.110813146421],
];

const datasetPublic = [
  [4.0564125598241425, 3789.6747948292177],
  [4.0564125598241425, 3789.6747948292177],
  [4.0564125598241425, 3789.6747948292177],
  [3.2985980766809178, 13873.1710312008145],
  [3.2985980766809178, 3873.1710312008145],
  [3.2985980766809178, 33873.1710312008145],
  [5.63900467860018, 5239.110813146421],
  [5.33900467860018, 5219.110813146421],
  [5.53900467860018, 5259.110813146421],
];

/**
 * @type {Types.ChartData} - Column chart data.
 */
export const availabilityChangeByInstitutionType = {
  section: 'examples',
  order: 4,
  id: 'availabilityChangeByInstitutionType',
  componentName: 'ChartCard',
  fakeHeight: '518px',
  options: {
    chart: {
      type: 'scatter',
      zoomType: 'xy',
    },
    title: {
      text: 'Institution Performance',
    },
    xAxis: {
      title: {
        text: 'Contractual programme of an institution [number of programs in contract]',
      },
      tickInterval: 10,
      zoomEnabled: true,
    },
    yAxis: {
      title: {
        text: 'Number of services rendered',
      },
      tickInterval: 5000,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: 'Zasebno',
        color: Highcharts.getOptions().colors[0],
        data: datasetPrivate,
        marker: {
          radius: 4,
        },
      },
      {
        name: 'Javno',
        color: Highcharts.getOptions().colors[1],
        data: datasetPublic,
        marker: {
          radius: 4,
          symbol: 'circle',
        },
      },
      {
        showInLegend: false,
        name: 'Regression Line (Private)',
        type: 'line',
        data: getTrendLine(datasetPrivate),
        color: Highcharts.getOptions().colors[0],
        marker: {
          enabled: false,
        },
        enableMouseTracking: false,
      },
      {
        showInLegend: false,
        name: 'Regression Line (Public)',
        type: 'line',
        data: getTrendLine(datasetPublic),
        color: Highcharts.getOptions().colors[1],
        marker: {
          enabled: false,
        },
        enableMouseTracking: false,
      },
    ],
    annotations: [
      {
        labels: [
          {
            point: { x: 20, y: 18000, xAxis: 0, yAxis: 0 },
            text: 'R²=0.600',
            style: {
              color: Highcharts.getOptions().colors[0],
            },
            useHtml: true,
          },
          {
            point: { x: 20, y: 32000, xAxis: 0, yAxis: 0 },
            text: 'R²=0.961',
            style: {
              color: Highcharts.getOptions().colors[1],
            },
            useHtml: true,
          },
        ],
        labelOptions: {
          backgroundColor: 'rgba(255,255,255,0.5)',
          verticalAlign: 'bottom',
          borderColor: 'transparent',
          // y: 15,
        },
      },
    ],
  },
};
