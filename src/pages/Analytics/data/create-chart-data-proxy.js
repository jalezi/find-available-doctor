/** @import * as Types from "../types" */

import slugify from 'slugify';

/**
 * @typedef {(Types.ChartData | Types.MapData)} ChartProxyArg
 */

/**
 * Creates a proxy object for handling chart data operations.
 * The proxy intercepts property access to provide custom functionality:
 * - If the property is 'id', returns a formatted version of the chart title.
 * - If the property is 'mergedOptions', returns the merged options of the target and common options.
 * @param {ChartProxyArg} obj - The target object to proxy.
 * @returns {ChartProxyArg & {id: string}} - A new Proxy instance for the target object with custom property access behavior.
 */
export function createChartDataProxy(obj) {
  const handler = {
    get(target, prop, _receiver) {
      if (prop === 'id') {
        if (!target.options.title.text) {
          throw new Error('The chart title is missing.');
        }
        return slugify(target.options.title.text.toLowerCase());
      }

      // eslint-disable-next-line prefer-rest-params
      return Reflect.get(...arguments);
    },
  };
  return new Proxy(obj, handler);
}
