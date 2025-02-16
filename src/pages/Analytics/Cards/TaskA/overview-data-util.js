/** @import * as Types from "./types" */

import { DEFAULTS } from './constants';
import { overviewTransformedData } from './json-data-transform-util';

export const overviewYearsDSO = new Set(
  overviewTransformedData.filter(item => item.doctorType === 'dso').map(item => item.year),
);

export const overviewYearsGP = new Set(
  overviewTransformedData.filter(item => item.doctorType === 'gp').map(item => item.year),
);

export const overviewYearsGYN = new Set(
  overviewTransformedData.filter(item => item.doctorType === 'gyn').map(item => item.year),
);

export const overviewYearsDEN = new Set(
  overviewTransformedData.filter(item => item.doctorType === 'den').map(item => item.year),
);

/**
 *
 * @description
 * @returns {Types.OverviewByYearAndTypeMap}
 */
const makeOverviewDataMap = () => {
  /** @type {Types.OverviewByYearAndTypeMap} */
  const doctorTypeDataMap = new Map();

  overviewTransformedData.forEach(item => {
    if (!doctorTypeDataMap.has(item.year)) {
      doctorTypeDataMap.set(item.year, new Map());
    }
    const yearData = doctorTypeDataMap.get(item.year);

    if (!yearData.has(item.doctorType)) {
      yearData.set(item.doctorType, []);
    }
    yearData.get(item.doctorType).push(item);
  });

  return doctorTypeDataMap;
};

export const overviewDataMap = makeOverviewDataMap();

/**
 * @function transformItemForMapChart
 * @param {Types.OverviewDataTransformedOutput} item
 * @param {Types.PropertyAsValue} propertyAsValue
 * @param {Types.Municipality} municipality
 * @returns {Types.OverviewDataMapSeriesDataItem}
 */
export const transformItemForMapChart = (item, propertyAsValue, municipality) => ({
  ...item,
  value: item[propertyAsValue],
  selected: municipality.includes(item.municipality),
});

/**
 * @function prepareOverviewMapSeriesData
 * @description Prepare data for the map series
 * @param {Types.UserInputsValues} filterState
 * @param {Types.PropertyAsValue} propertyAsValue
 * @returns {Types.OverviewDataMapSeriesDataItem[]}
 */
export const prepareOverviewMapSeriesData = (
  filterState = DEFAULTS,
  propertyAsValue = 'iozRatio',
) => {
  const data = overviewDataMap.get(Number(filterState.year))?.get(filterState.doctorType);
  if (!data) {
    return [];
  }

  const seriesData = data
    .filter(item => item[propertyAsValue] != null)
    .map(item => transformItemForMapChart(item, propertyAsValue, filterState.municipalities));

  // eslint-disable-next-line no-console
  console.assert(
    seriesData.length === data.length,
    'Some data was filtered out during transformation',
  );

  return seriesData;
};
