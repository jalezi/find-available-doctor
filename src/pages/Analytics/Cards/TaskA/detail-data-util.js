/** @import * as Types from "./types" */

import { getTaskAAgeGroupString } from 'pages/Analytics/constants';
import { DEFAULTS } from './constants';
import { detailTransformedData } from './json-data-transform-util';

/**
 * @description
 * @returns {Types.DetailByMunicipalityAndTypeAndAgeGroupMap}
 */
const makeDetailDataMap = () => {
  /** @type {Types.DetailByMunicipalityAndTypeAndAgeGroupMap} */
  const doctorTypeDataMap = new Map();
  detailTransformedData.forEach(item => {
    if (!doctorTypeDataMap.has(item.municipality)) {
      doctorTypeDataMap.set(item.municipality, new Map());
    }
    const municipalityData = doctorTypeDataMap.get(item.municipality);
    if (!municipalityData.has(item.doctorType)) {
      municipalityData.set(item.doctorType, new Map());
    }
    const doctorTypeData = municipalityData.get(item.doctorType);
    if (!doctorTypeData.has(item.ageGroup)) {
      doctorTypeData.set(item.ageGroup, []);
    }
    doctorTypeData.get(item.ageGroup).push(item);
  });
  return doctorTypeDataMap;
};

export const detailDataMap = makeDetailDataMap();

/**
 * Aggregates data by age group and year, computing metrics like `iozRatio`.
 * @param {Types.AggregatedDataMap} acc - The accumulator for aggregated data.
 * @param {Types.DetailDataTransformedOutput} item - A single data item to aggregate.
 * @returns {Types.AggregatedDataMap} Updated accumulator.
 */
const aggregateByYearAndAgeGroup = (acc, item) => {
  const {
    year,
    ageGroup,
    insuredPeopleCount,
    insuredPeopleCountWithIOZ,
    insuredPeopleCountWithoutIOZ,
  } = item;

  // Get or initialize the age group map
  /** @type {Types.YearDataMap} */
  const yearDataMap = acc.get(ageGroup) || new Map();

  // Get or initialize the year data
  const yearData = yearDataMap.get(year) || {
    insuredPeopleCount: 0,
    insuredPeopleCountWithIOZ: 0,
    insuredPeopleCountWithoutIOZ: 0,
    iozRatio: 0,
    id: `${ageGroup}-${year}`,
    name: `Age Group ${ageGroup}`, // TODO: Do we need this?
    year,
  };

  // Update year data
  yearData.insuredPeopleCount += insuredPeopleCount;
  yearData.insuredPeopleCountWithIOZ += insuredPeopleCountWithIOZ;
  yearData.insuredPeopleCountWithoutIOZ += insuredPeopleCountWithoutIOZ;
  yearData.iozRatio =
    yearData.insuredPeopleCount > 0
      ? yearData.insuredPeopleCountWithIOZ / yearData.insuredPeopleCount
      : 0;

  // Update maps
  yearDataMap.set(year, yearData);
  acc.set(ageGroup, yearDataMap);

  return acc;
};

/**
 * Collects and flattens data for selected municipalities and doctor types.
 * @param {string[]} municipalities - List of selected municipalities.
 * @param {string} doctorType - Doctor type filter.
 * @returns {Types.DetailDataTransformedOutput[]} Collected data.
 */
const collectData = (municipalities, doctorType) =>
  municipalities.flatMap(municipality => {
    const data = detailDataMap.get(municipality)?.get(doctorType);
    return data ? Array.from(data.values()).flat() : [];
  });

/**
 * Converts aggregated data into a format suitable for Highcharts.
 * @param {Types.AggregatedDataMap} aggregatedData - The aggregated data map.
 * @param {string} xProp - Property to use as the x-axis value.
 * @param {string} yProp - Property to use as the y-axis value.
 * @returns {Types.LineChartSeries[]} Highcharts-compatible series data.
 */
const transformToChartSeries = (aggregatedData, xProp, yProp, doctorType) =>
  Array.from(aggregatedData.entries()).map(([ageGroup, yearDataMap]) => ({
    id: `ageGroup${ageGroup}`,
    name: getTaskAAgeGroupString(doctorType, ageGroup),
    data: Array.from(yearDataMap.values()).map(item => ({
      ...item,
      x: item[xProp],
      y: item[yProp],
    })),
  }));

/**
 * Prepares data for the line chart series.
 * @param {typeof DEFAULTS["municipalities"]} municipalities - List of selected municipalities.
 * @param {typeof DEFAULTS["doctorType"]} doctorType - Doctor type filter.
 * @param {{ xProp?: string, yProp?: string }} options - Configuration for axis mapping. Defaults to `year` and `iozRatio`. // TODO add better types
 * @default municipalities DEFAULTS.municipalities = []
 * @default doctorType DEFAULTS.doctorType = "gp"
 * @default options { xProp: 'year', yProp: 'iozRatio' }
 * @returns {Types.LineChartSeries[]} Prepared line chart series data.
 */
export const prepareDetailLineChartSeries = (
  municipalities = DEFAULTS.municipalities,
  doctorType = DEFAULTS.doctorType,
  { xProp = 'year', yProp = 'iozRatio' } = {},
) => {
  // Use all municipalities if none are selected
  const selectedMunicipalities =
    municipalities.length > 0 ? municipalities : Array.from(detailDataMap.keys());

  // Step 1: Collect data
  const collectedData = collectData(selectedMunicipalities, doctorType);

  /**
   * @type {Types.AggregatedDataMap}
   */
  const accInitial = new Map();

  // Step 2: Aggregate data using the properly typed Map
  const aggregatedData = collectedData.reduce(
    (acc, item) => aggregateByYearAndAgeGroup(acc, item),
    accInitial,
  );

  // Step 3: Transform to chart series
  return transformToChartSeries(aggregatedData, xProp, yProp, doctorType);
};
