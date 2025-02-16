/* eslint-disable no-console */
/** @import * as Types from "../TaskA/types" */

import { detailTransformedData, overviewTransformedData } from '../TaskA/json-data-transform-util';

export const uniqueOverviewDoctorTypesSet = new Set(
  overviewTransformedData.map(item => item.doctorType),
);

export const uniqueDetailDoctorTypesSet = new Set(
  detailTransformedData.map(item => item.doctorType),
);

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
    assertSetsEqual(uniqueOverviewDoctorTypesSet, uniqueDetailDoctorTypesSet),
    'Overview doctor types set and detail doctor types set are not equal',
  );
}

/**
 * @constant DEFAULTS
 * @description Doctor type data map key is year and doctor type value is array of data
 * @type {Pick<Types.UserInputsValues, "doctorType">}
 * @default doctorType 'gp'
 */
export const DEFAULTS = Object.freeze({
  doctorType: 'gp',
});
