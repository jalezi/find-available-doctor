/** @import * as Types from "../types" */

import examples from './examples';
import { mapOptions } from '../RichInfoClick/chart-options';
import { availabilityChangeByInstitutionType } from './production/availability-change-by-institution-type';

export const charts = [
  availabilityChangeByInstitutionType,
  {
    section: 'real section 1',
    order: 1,
    componentName: 'RichInfoClick',
    fakeHeight: '780px',
    options: { title: { text: mapOptions.title.text ? mapOptions.title.text : 'Missing Title' } },
  },
  ...Object.values(examples),
];

const groupedCharts = charts.reduce((acc, chart) => {
  const { section } = chart;
  if (!acc[section]) {
    acc[section] = [];
  }
  acc[section].push(chart);
  return acc;
}, {});

/**
 * @type {Array<{sectionTitle: Types.SectionNames[number], charts: Types.ChartData[]}>}
 */
export const SECTIONS = Object.keys(groupedCharts).map(section => ({
  sectionTitle: section,
  charts: groupedCharts[section].sort((a, b) => a.order - b.order),
}));
