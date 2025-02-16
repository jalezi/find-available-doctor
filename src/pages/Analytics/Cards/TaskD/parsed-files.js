/* eslint-disable no-restricted-syntax */
/** @import * as TaskDTypes from "./types" */

import gynDoseganjePovprecja from 'assets/data/analytics/pivotke-D/pivot_ginekologi_doseganje_povprecja.json';
import gynObseg from 'assets/data/analytics/pivotke-D/pivot_ginekologi_obseg.json';
import gpGlavarina from 'assets/data/analytics/pivotke-D/pivot_zdravniki_glavarina.json';
import gpGlavarinaMean from 'assets/data/analytics/pivotke-D/pivot_zdravniki_glavarina_mean.json';
import gpObseg from 'assets/data/analytics/pivotke-D/pivot_zdravniki_obseg.json';
import denDoseganjePovprecja from 'assets/data/analytics/pivotke-D/pivot_zobozdravniki_doseganje_povprecja.json';
import denObseg from 'assets/data/analytics/pivotke-D/pivot_zobozdravniki_obseg.json';

/** @type {Record<TaskDTypes.FileKey, TaskDTypes.JsonItem[]>} */
const files = Object.freeze({
  gynDoseganjePovprecja,
  gynObseg,
  gpGlavarinaMean,
  gpGlavarina,
  gpObseg,
  denDoseganjePovprecja,
  denObseg,
});

// Define data groups for categorization
const dataGroups = Object.freeze({
  avg: Object.freeze(['gynDoseganjePovprecja', 'denDoseganjePovprecja']),
  vol: Object.freeze(['gynObseg', 'gpObseg', 'denObseg']),
  capitation: Object.freeze(['gpGlavarina', 'gpGlavarinaMean']),
});

const groupOrder = Object.freeze({
  avg: 2,
  vol: 1,
  capitation: 0,
});

export const groupYAxisLabelFormat = Object.freeze({
  gynDoseganjePovprecja: 'percent',
  gynObseg: 'decimal',
  gpGlavarinaMean: 'decimal',
  gpGlavarina: 'decimal',
  gpObseg: 'decimal',
  denDoseganjePovprecja: 'percent',
  denObseg: 'decimal',
});

/**
 * @type {TaskDTypes.GroupOption[]}
 */
export const groupOptions = Object.entries(dataGroups)
  .map(([label, opts]) => ({
    label,
    options: opts.map(value => ({
      name: 'data',
      label: value,
      value,
      group: label,
    })),
  }))
  .sort((a, b) => groupOrder[a.label] - groupOrder[b.label]);

/**
 * @function neki
 * @param {Record<TaskDTypes.FileKey, TaskDTypes.JsonItem[]>} files
 * @returns {Map<TaskDTypes.FileKey, TaskDTypes.ParsedData>}
 */
// eslint-disable-next-line no-shadow
const parseFiles = files => {
  const parsedDataMap = new Map();

  for (const [fileName, items] of Object.entries(files)) {
    const data = { public: [], private: [] };

    for (const item of items) {
      const { datum, javni, zasebni } = item;
      const [year, month, day] = datum.split('-');
      const date = Date.UTC(year, month - 1, day);
      data.public.push([date, Number(parseFloat(javni).toFixed(2))]);
      data.private.push([date, Number(parseFloat(zasebni).toFixed(2))]);
    }

    parsedDataMap.set(fileName, Object.freeze(data));
  }

  return parsedDataMap;
};

/** @type {Map<TaskDTypes.FileKey, TaskDTypes.ParsedData} */
export const parsedData = parseFiles(files);
