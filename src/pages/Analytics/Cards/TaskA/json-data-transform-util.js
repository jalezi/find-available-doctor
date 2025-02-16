/** @import * as Types from "./types" */

import detailData from 'assets/data/analytics/task-a/podatki-detail.json';
import overviewData from 'assets/data/analytics/task-a/podatki-overview.json';
import { detailSchemaTransformed, overviewSchemaTransformed } from './schemas';

const isDev = process.env.NODE_ENV === 'development';
export const overviewDataTransform = data => {
  const safeData = overviewSchemaTransformed.safeParse(data);
  if (!safeData.success) {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.error('Error transforming overview data.', {
        message: 'Validation failed while parsing overview data.',
        details: safeData.error.errors.map(err => ({
          path: err.path.join(' > '), // Path to the failing field
          issue: err.message, // Description of the issue
        })),
        originalData: data,
        hint: 'Ensure the data conforms to the expected schema. Check for missing or incorrect fields.',
      });
    }
    return null;
  }
  return safeData.data;
};

export const detailDataTransform = data => {
  const safeData = detailSchemaTransformed.safeParse(data);
  if (!safeData.success) {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.error('Error transforming detail data.', {
        message: 'Validation failed while parsing detail data.',
        details: safeData.error.errors.map(err => ({
          path: err.path.join(' > '), // Path to the failing field
          issue: err.message, // Description of the issue
        })),
        originalData: data,
        hint: 'Ensure the data conforms to the expected schema. Check for missing or incorrect fields.',
      });
    }
    return null;
  }
  return safeData.data;
};

/**
 * @constant overviewTransformedData
 * @description Array of transformed overview data
 * @type {Types.OverviewDataTransformedOutput[]}
 */
export const overviewTransformedData = overviewData
  .map(overviewDataTransform)
  .filter(Boolean)
  .sort((a, b) => {
    if (a.year === b.year) {
      return a.municipality.localeCompare(b.municipality);
    }
    return b.year - a.year;
  });
// eslint-disable-next-line no-console
console.assert(
  overviewTransformedData.length === overviewData.length,
  "Some data wasn't transformed",
);

/**
 * @constant detailTransformedData
 * @description Array of transformed detail data
 * @type {Types.DetailDataTransformedOutput[]}
 */
export const detailTransformedData = detailData
  .map(detailDataTransform)
  .filter(Boolean)
  .sort((a, b) => {
    if (a.year === b.year) {
      return a.municipality.localeCompare(b.municipality);
    }
    return b.year - a.year;
  });
// eslint-disable-next-line no-console
console.assert(detailTransformedData.length === detailData.length, "Some data wasn't transformed");
