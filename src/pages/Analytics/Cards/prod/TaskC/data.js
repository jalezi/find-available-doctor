/* eslint-disable no-param-reassign */
/** @import * as Types from "./types" */

import { DATA } from '../../../data/fake-data';

export const YEARS = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
export const AGE_GROUPS = ['0-17', '18-25'];

export const DOCTOR_TYPES = ['gp', 'den', 'gyn'];
export const ASSIGNED_TYPES = ['assigned', 'unassigned'];
export const CONTRACT_TYPES = ['public', 'private'];

export const DOCTOR_TYPES_MAP = {
  gp: 'Splošni zdravnik',
  den: 'Zobozdravnik',
  gyn: 'Ginekolog',
};

export const ASSIGNED_TYPES_MAP = {
  all: 'Vsi',
  assigned: 'Opredeljeni',
  unassigned: 'Neopredeljeni',
};

export const CONTRACT_TYPES_MAP = {
  all: 'Vsi',
  public: 'Javni',
  private: 'Zasebni',
};

/** @type {Types.InsuredData[]} */
const generateFakeData = () => {
  const data = [];
  DATA.MUNICIPALITIES.forEach(municipality => {
    DATA.YEARS.forEach(year => {
      DATA.AGE_GROUPS.forEach(ageGroup => {
        DOCTOR_TYPES.forEach(doctorType => {
          ASSIGNED_TYPES.forEach(assignedType => {
            CONTRACT_TYPES.forEach(contractType => {
              data.push({
                municipality,
                year,
                ageGroup,
                doctorType,
                value: Math.floor(Math.random() * 1000),
                assignedType,
                contractType,
              });
            });
          });
        });
      });
    });
  });
  return data;
};

/** @type {Types.UserInputsValues} */
export const DEFAULTS = {
  municipality: DATA.MUNICIPALITIES[0], // first available municipality
  year: 2023, // last available year
  ageGroup: '0-17', // first available age group
  doctorType: 'gp', // first available doctor type
  assignedType: 'all', // all assigned types
  contractType: 'all', // all contract types
};

/**
 * @param {Types.InsuredData} item - The data to check against filter options.
 * @param {Types.FilterOptions} filterOptions - The filter options object - The list of contract types.
 * @returns {Boolean} - Whether the item matches the filter options.
 */
export const matchesFilterOptions = (item, filterOptions) => {
  if (!filterOptions || !item) {
    throw new Error('Both item and filter options are required.');
  }

  const {
    municipalities = [],
    years = [],
    ageGroups = [],
    doctorTypes = [],
    assignedTypes = [],
    contractTypes = [],
  } = filterOptions;

  const filters = [
    { list: municipalities, value: item.municipality },
    { list: years, value: item.year },
    { list: ageGroups, value: item.ageGroup },
    { list: doctorTypes, value: item.doctorType },
    { list: assignedTypes, value: item.assignedType },
    { list: contractTypes, value: item.contractType },
  ];

  return filters.every(filter => filter.list.length === 0 || filter.list.includes(filter.value));
};

/**
 * This function returns the data for the first chart.
 * It filters the data based on filter values and maps it to the correct format.
 * If necessary it calculates the sum of values for ContractType if contractType is all or/and
 * AssignedType if assignedType is all.
 * If both contractType and assignedType are all, it calculates the sum of values for both.
 *
 * @param {Types.InsuredData[]} data - The data to filter and map.
 * @param {Types.UserInputsValues} filterValues - The filter values object.
 * @returns {{municipality: string, value: number}[]}
 */
export const prepareMapSeriesData = (data, filterValues) => {
  const mapSeriesData = [];
  const { assignedType, contractType } = filterValues;

  const matchFilterValues = {
    municipalities: [],
    years: [+filterValues.year],
    ageGroups: [filterValues.ageGroup],
    doctorTypes: [filterValues.doctorType],
    assignedTypes: assignedType === 'all' ? [] : [assignedType],
    contractTypes: contractType === 'all' ? [] : [contractType],
  };

  // filter data based on filter values
  const filteredData = data.filter(item => matchesFilterOptions(item, matchFilterValues));

  filteredData.forEach(item => {
    const index = mapSeriesData.findIndex(element => element.municipality === item.municipality);
    if (index === -1) {
      mapSeriesData.push({ municipality: item.municipality, value: item.value });
    } else {
      mapSeriesData[index].value += item.value;
    }
  });

  return mapSeriesData;
};

/**
 * This function returns the data for the second chart.
 * If necessary it calculates the sum of values for ContractType if contractType is all
 * @param {Types.InsuredData[]} data - The data to filter and map.
 * @param {Exclude<Types.UserInputsValues, ("assignedType" | "years")>} filterValues - The filter values object.
 * @returns {{assigned: {municipality: string, value: number}[], unassigned: {municipality: string, value: number}[]}}
 */
export const prepareSecondChartSeriesData = (data, filterValues, years = YEARS) => {
  const chartSeriesData = [];
  const { contractType } = filterValues;

  // filter data based on filter values
  const filteredData = data.filter(item =>
    matchesFilterOptions(item, {
      municipalities: [filterValues.municipality],
      years: [],
      ageGroups: [filterValues.ageGroup],
      doctorTypes: [filterValues.doctorType],
      assignedTypes: [],
      contractTypes: contractType === 'all' ? [] : [contractType],
    }),
  );

  // for each year, calculate the sum of values for AssignedType if assignedType is all else just map the data
  years.forEach(year => {
    const yearData = filteredData.filter(item => item.year === year);
    const assignedData = yearData
      .filter(item => item.assignedType === 'assigned')
      .map(item => item.value);

    const unassignedData = yearData
      .filter(item => item.assignedType === 'unassigned')
      .map(item => item.value);

    chartSeriesData.push({
      year,
      assigned: assignedData.reduce((acc, val) => acc + val, 0),
      unassigned: unassignedData.reduce((acc, val) => acc + val, 0),
    });
  });

  return {
    assigned: chartSeriesData.map(item => ({ x: item.year, y: item.assigned })),
    unassigned: chartSeriesData.map(item => ({ x: item.year, y: item.unassigned })),
  };
};

export const fakeData = generateFakeData();

export const getMapSeriesData = filterValues => prepareMapSeriesData(fakeData, filterValues);
export const defaultMapSeriesData = getMapSeriesData(DEFAULTS);

export const getSecondChartSeriesData = filterValues =>
  prepareSecondChartSeriesData(fakeData, filterValues);
export const defaultSecondChartSeriesData = getSecondChartSeriesData(DEFAULTS);

/**
 * Function takes a year range object and calculates the assigned and unassigned total for range.
 * If range is single year [2013, 2013] it returns the data for that year,
 * if range is multiple years [2013, 2015] it returns the sum of assigned and unassigned for all years in range.
 *
 * @param {Types.InsuredData[]} data - The data to filter and map.
 * @param {Exclude<Types.UserInputsValues, ("assignedType" | "years")>} filterValues - The filter values object.
 * @param {[number, number]} yearRange - The year range array.
 * @returns {{assigned: number, unassigned: number}}
 */
export const calculateAssignedTypeTotalsForYearRange = (data, filterValues, yearRange) => {
  const [startYear, endYear] = yearRange;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  const filteredData = data.filter(item =>
    matchesFilterOptions(item, {
      municipalities: [],
      years,
      ageGroups: [filterValues.ageGroup],
      doctorTypes: [filterValues.doctorType],
      assignedTypes: [],
      contractTypes: filterValues.contractType === 'all' ? [] : [filterValues.contractType],
    }),
  );

  const totals = { assigned: 0, unassigned: 0 };

  filteredData.forEach(item => {
    if (item.assignedType === 'assigned') {
      totals.assigned += item.value;
    } else if (item.assignedType === 'unassigned') {
      totals.unassigned += item.value;
    }
  });

  return totals;
};

/**
 * Retrieves the total assigned types for a given year range.
 *
 * @param {Exclude<Types.UserInputsValues, ("assignedType" | "years")>} filterValues - The filter values to apply.
 * @param {[number, number]} yearRange - The range of years to consider.
 * @returns {{assigned: number, unassigned: number}>} The calculated totals of assigned types for the specified year range.
 */
export const getAssignedTypeTotalsForYearRange = (filterValues, yearRange) =>
  calculateAssignedTypeTotalsForYearRange(fakeData, filterValues, yearRange);

/**
 * Calculates the totals of assigned types and their trends based on the provided filter state.
 *
 * @typedef {Object} AssignedTypesTotals
 * @property {number} assignedTotalsCurrent - The total of assigned types.
 * @property {number} trendAssigned - The trend of assigned types compared to the previous year.
 * @property {number} trendUnassigned - The trend of unassigned types compared to the previous year.
 *
 * @param {Types.UserInputsValues} filterState - The state used to filter the data.
 * @returns {AssignedTypesTotals} An object containing the current assigned totals and the trends for assigned and unassigned types.
 */
export function calculateAssignedTypesTotals(filterState) {
  const assignedTotalsCurrent = getAssignedTypeTotalsForYearRange(filterState, [
    filterState.year,
    filterState.year,
  ]);
  const assignedTotalsBefore = getAssignedTypeTotalsForYearRange(filterState, [
    filterState.year - 1,
    filterState.year - 1,
  ]);

  const trendAssigned =
    (assignedTotalsCurrent.assigned - assignedTotalsBefore.assigned) /
    assignedTotalsBefore.assigned;

  const trendUnassigned =
    (assignedTotalsCurrent.unassigned - assignedTotalsBefore.unassigned) /
    assignedTotalsBefore.unassigned;
  return { assignedTotalsCurrent, trendAssigned, trendUnassigned };
}
