/* eslint-disable no-console */
/** @import * as Types from "./types" */

import { detailTransformedData, overviewTransformedData } from './json-data-transform-util';

export const CITY_MUNICIPALITIES_LIST = [
  'Celje',
  'Koper',
  'Kranj',
  'Krško',
  'Ljubljana',
  'Maribor',
  'Murska Sobota',
  'Nova Gorica',
  'Novo mesto',
  'Ptuj',
  'Slovenj Gradec',
  'Velenje',
];

export const uniqueOverviewYearsSet = new Set(overviewTransformedData.map(item => item.year));
export const uniqueOverviewDoctorTypesSet = new Set(
  overviewTransformedData.map(item => item.doctorType),
);
export const uniqueOverviewMunicipalitiesSet = new Set(
  overviewTransformedData.map(item => item.municipality),
);

const uniqueDetailYearsSet = new Set(detailTransformedData.map(item => item.year));
export const uniqueDetailDoctorTypesSet = new Set(
  detailTransformedData.map(item => item.doctorType),
);
const uniqueDetailMunicipalitiesSet = new Set(detailTransformedData.map(item => item.municipality));

/**
 * assert if sets are equal
 */
export const assertSetsEqual = (set1, set2) => {
  if (set1.size !== set2.size) {
    return false;
  }
  if (!Array.from(set1).every(item => set2.has(item))) {
    return false;
  }
  return true;
};

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  console.assert(
    assertSetsEqual(uniqueOverviewYearsSet, uniqueDetailYearsSet),
    'Overview years set and detail years set are not equal',
  );
  console.assert(
    assertSetsEqual(uniqueOverviewDoctorTypesSet, uniqueDetailDoctorTypesSet),
    'Overview doctor types set and detail doctor types set are not equal',
  );
  console.assert(
    assertSetsEqual(uniqueOverviewMunicipalitiesSet, uniqueDetailMunicipalitiesSet),
    'Overview municipalities set and detail municipalities set are not equal',
  );
}

/**
 * @constant DEFAULTS
 * @description Doctor type data map key is year and doctor type value is array of data
 * @type {Types.UserInputsValues}
 * @default year Math.max(...uniqueYearsSet)
 * @default doctorType 'gp'
 * @default municipalities []
 */
export const DEFAULTS = Object.freeze({
  year: Math.max(...uniqueOverviewYearsSet),
  doctorType: 'gp',
  municipalities: [],
});
