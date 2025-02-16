/** @import * as TaskDTypes from "./types" */

import { groupYAxisLabelFormat, parsedData } from './parsed-files';

export const seriesToShow = ['public', 'private'];

const prepareSeries = ({ filterState, seriesTranslations, serieNames = ['public', 'private'] }) => {
  const series = serieNames.map(serie => {
    const serieData = parsedData.get(filterState.data)[serie];
    if (!serieData) {
      throw new Error(`Invalid serie name: ${serie}`);
    }
    return {
      id: serie,
      name: seriesTranslations[serie],
      data: serieData,
    };
  });
  return series;
};

const prepareXAxisTickPositions = data => {
  const uniqueYears = new Set([
    ...data.public.map(point => new Date(point[0]).getUTCFullYear()),
    ...data.private.map(point => new Date(point[0]).getUTCFullYear()),
  ]);

  // Calculate tick positions for starting years
  const tickPositions = Array.from(uniqueYears)
    .sort((a, b) => a - b) // Ensure years are sorted
    .map(year => Date.UTC(year, 0, 1)); // Start of each year

  return tickPositions;
};

const prepareXAxis = series => ({
  tickPositions: prepareXAxisTickPositions(
    series.reduce((acc, serie) => {
      acc[serie.id] = serie.data;
      return acc;
    }, {}),
  ),
});

/**

 * @function prepareYAxisLabelFormat
 * @param {TaskDTypes.FileKey} label - Selected value from the filter.
 * @returns {TaskDTypes.YAxisLabelFormatValue} Formatted label based on the selected value.
 */
export const prepareYAxisLabelFormat = label => groupYAxisLabelFormat[label];

/**

 * @function labelsFormatter
 * @param {TaskDTypes.FileKey} selectedValue - Selected value from the filter.
 * @param {string} lng - Language code.
 * @returns {string} Formatted label based on the selected value and language.
 */
function labelsFormatter(selectedValue, lng) {
  if (!selectedValue || !lng) {
    throw new Error('Both selectedValue and lng are required.');
  }

  const labelFormat = prepareYAxisLabelFormat(selectedValue);
  const localeBase = lng.split('-')[0] || 'en';
  const suffixMap = {
    sl: 'tis.',
    en: 'k',
  };

  const { value } = this;
  if (value == null) return '';

  if (labelFormat === 'percent') {
    return new Intl.NumberFormat(lng, {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value / 100);
  }

  const isOverMillion = value >= 1_000_000;
  const suffix = isOverMillion ? suffixMap[localeBase] || 'k' : '';
  const valueToFormat = isOverMillion ? value / 1_000 : value;

  return `${new Intl.NumberFormat(lng, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: 'auto',
  }).format(valueToFormat)} ${suffix}`.trim();
}

const prepareYAxis = (filterState, lng, title) => ({
  title: {
    text: title,
  },
  labels: {
    formatter() {
      return labelsFormatter.call(this, filterState.data, lng);
    },
  },
});

const prepareAccessibility = () => ({
  screenReaderSection: {
    beforeChartFormat: '<h4>{chartTitle}</h4>',
  },
});

export const prepareTaskDChartOptions = ({ filterState, translations, lng }) => {
  const series = prepareSeries({
    filterState,
    seriesTranslations: translations.series,
    seriesToShow,
  });

  return {
    title: { text: translations.title },
    xAxis: prepareXAxis(series),
    yAxis: prepareYAxis(filterState, lng, translations.yAxis.titles[filterState.data]),
    series,
    accessibility: prepareAccessibility(),
  };
};
