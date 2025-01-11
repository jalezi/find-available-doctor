/* eslint-disable no-shadow */

import sloMunicipalitiesJSON from 'assets/data/slovenia_municipalities.json';

/**
 * @typedef {"0-17" | "18-25" | "26-35" | "36-45" | "46-55" | "56-65" | "65+"} AgeGroup
 */

/**
 * @typedef {2013 | 2014 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 } Year
 */

/**
 * temporary to until we get the real data
 * @constant {AgeGroup[]} AGE_GROUPS
 * @type {AgeGroup[]}
 */
const AGE_GROUPS = ['0-17', '18-25', '26-35', '36-45', '46-55', '56-65', '65+'];

/**
 * temporary to until we get the real data
 * @constant {Year[]} YEARS
 * @type {Year[]}
 */
const YEARS = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

/**
 * @typedef {Object} AgeGroupItem
 * @property {string} name - The name of the item.
 * @property {number} value - The value of the item.
 * @property {Year} year - The year of the item.
 * @property {AgeGroup} ageGroup - The age group of the item.
 */

/**
 * Generates fake AgeGroupItem data for each municipality, year, and age group.
 * @param {string[]} municipalities - List of municipality names.
 * @returns {AgeGroupItem[]} - List of generated AgeGroupItem objects.
 */
function generateFakeData(municipalities) {
  const data = [];

  municipalities.forEach(municipality => {
    YEARS.forEach(year => {
      AGE_GROUPS.forEach(ageGroup => {
        data.push({
          name: municipality,
          value: Math.floor(Math.random() * 1000) / 100, // Random value between 0 and 999
          year,
          ageGroup,
        });
      });
    });
  });

  return data;
}

export const fakeData = generateFakeData(sloMunicipalitiesJSON);

/**
 * @typedef {("line" | "bar" | "column")} TooltipChartType
 */

/**
 * @description The data object for the DataByYearAndAgeGroupCard component.
 * @typedef {Object} Data
 * @property {string[]} Data.MUNICIPALITIES - List of municipality names.
 * @property {AgeGroup[]} Data.AGE_GROUPS - List of age groups.
 * @property {Year[]} Data.YEARS - List of years.
 * @property {TooltipChartType[]} Data.TOOLTIP_CHART_TYPES- The chart type for the tooltip
 * @property {{ year: Year, ageGroup: AgeGroup, tooltipChartType: TooltipChartType }} Data.defaults - Default year and age group.
 */

/**
 * @constant {Data} DATA
 * @type {Data}
 */
export const DATA = {
  MUNICIPALITIES: [...new Set(fakeData.map(item => item.name))],
  AGE_GROUPS: [...new Set(fakeData.map(item => item.ageGroup))],
  YEARS: [...new Set(fakeData.map(item => item.year))],
  TOOLTIP_CHART_TYPES: ['line', 'bar', 'column'],
  defaults: {
    year: YEARS[0],
    ageGroup: AGE_GROUPS[0],
    tooltipChartType: 'bar',
  },
};

/**
 * @type {Map<AgeGroup, AgeGroupItem[]>}
 */
export const byAgeGroupMap = new Map(
  [...AGE_GROUPS].map(ageGroup => [ageGroup, fakeData.filter(item => item.ageGroup === ageGroup)]),
);

/**
 * @type {Map<string, Map<AgeGroup, AgeGroupItem[]>}
 */
export const byMunicipalityMap = new Map(
  [...DATA.MUNICIPALITIES].map(municipality => [
    municipality,
    new Map(
      [...AGE_GROUPS].map(ageGroup => [
        ageGroup,
        fakeData.filter(item => item.name === municipality && item.ageGroup === ageGroup),
      ]),
    ),
  ]),
);

/**
 * Groups an array of objects by two specified keys, producing a nested Map structure.
 *
 * @template {Object} T - The type of objects in the `data` array.
 * @template {keyof T} K1 - The first key used for grouping.
 * @template {keyof T} K2 - The second key used for grouping.
 * @template {Record<K1 | K2, (string | number)[]>} Keys - The type representing the valid values for each key.
 *
 * @param {[K1, K2]} keys - An array of two keys to group the data by, in order of nesting.
 * @param {Keys} keysData - An object where each key is a grouping key and maps to an array of valid values.
 * @param {T[]} data - The array of objects to group.
 *
 * @returns {Map<Keys[K1][number], Map<Keys[K2][number], T[]>>}
 * A nested Map structure, where the outer Map's keys are values of `K1`,
 * the inner Map's keys are values of `K2`, and the values are arrays of objects.
 */
export function groupBy(keys, keysData, data) {
  const firstKey = keys[0];
  const secondKey = keys[1];
  return new Map(
    keysData[firstKey].map(key1 => [
      key1,
      new Map(
        keysData[secondKey].map(key2 => [
          key2,
          data.filter(item => item[firstKey] === key1 && item[secondKey] === key2),
        ]),
      ),
    ]),
  );
}

export const inputDataKeys = {
  name: DATA.MUNICIPALITIES,
  year: DATA.YEARS,
  ageGroup: DATA.AGE_GROUPS,
};

export const byAgeGroupAndYearMap = groupBy(['ageGroup', 'year'], inputDataKeys, fakeData);
export const byYearAndAgeGroupMap = groupBy(['year', 'ageGroup'], inputDataKeys, fakeData);
// export const byYearAndMunicipalityMap = groupBy(['year', 'name'], inputDataKeys, fakeData);
// export const byMunicipalityAndYearMap = groupBy(['name', 'year'], inputDataKeys, fakeData);
export const byMunicipalityAndAgeGroupMap = groupBy(['name', 'ageGroup'], inputDataKeys, fakeData);
export const byAgeGroupAndMunicipalityMap = groupBy(['ageGroup', 'name'], inputDataKeys, fakeData);
