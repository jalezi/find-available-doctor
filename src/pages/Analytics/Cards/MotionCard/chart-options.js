/** @import * as Types from "../../types" */

import { sloOBMap } from 'pages/Analytics/data/geo-json-maps';

// import { dimensions } from 'pages/Analytics/HighchartsOptions/options';

/** @type {Types.HighMapsOptions} */
export const mapOptions = {
  chart: {
    map: sloOBMap,

    // height: 300,
  },
  colorAxis: {
    minColor: '#AAE8F8',
    maxColor: '#095568',
    startOnTick: true,
    endOnTick: true,
  },
  tooltip: {
    useHTML: true,
  },
  series: [
    {
      type: 'map',
      mapData: sloOBMap,
      keys: ['name', 'value'],
      joinBy: 'name',
    },
  ],
};
