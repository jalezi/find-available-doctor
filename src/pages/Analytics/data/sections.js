/** @import * as Types from "../types" */

/**
 * TODO
 *  - check for actual fake height values; card height can be different on mobile or desktop or other devices:
 *  fakeHeight is needed to simulate the height of the card in the editor so the scrolling is correct if card is not rendered yet
 *  and user navigates to it via the sidebar
 *
 */

import { mapOptions as RomanLustrikCardMapOptions } from '../Cards/DataByYearAndAgeGroupCard/char-options';
import { mapOptions as RichInfoClickOptions } from '../Cards/RichInfoClick/chart-options';
import { availabilityChangeByInstitutionType } from './production/availability-change-by-institution-type';

const isDev = process.env.NODE_ENV === 'development';

export const charts = [
  {
    section: 'Analitični prikaz podatkov o dostopnosti do primarne zdravstvene oskrbe',
    order: 0,
    componentName: 'TaskA',
    fakeHeight: '827px', // TODO: check for actual fake height value,
    options: {
      title: {
        text: 'Task A Naslov',
      },
    },
  },
  {
    section: 'Analitični prikaz podatkov o dostopnosti do primarne zdravstvene oskrbe',
    order: 0,
    componentName: 'PivotkeD',
    fakeHeight: '584px', // TODO: check for actual fake height value
    options: {
      title: {
        text: 'Task D Naslov',
      },
    },
  },
  {
    section: 'Analitični prikaz podatkov o dostopnosti do primarne zdravstvene oskrbe',
    order: 1,
    componentName: 'InsuredByDefinitionAndByAgeGroup',
    fakeHeight: '500px',
    options: {
      title: {
        // text: 'Število zavarovancev in opredeljenost po starostnih skupinah',
        text: 'Task C Naslov',
      },
    },
  },
  {
    section: 'examples',
    order: 5,
    componentName: 'MotionCard',
    fakeHeight: '2876px',
    options: {
      title: {
        text: 'MotionCard',
      },
    },
  },
  {
    section: 'examples',
    order: 0,
    componentName: 'DashboardCard',
    fakeHeight: '683px',
    options: {
      title: {
        text: 'Dashboard',
      },
    },
  },
  availabilityChangeByInstitutionType,
  {
    section: 'examples',
    order: 1,
    componentName: 'DataByYearAndAgeGroupCard',
    fakeHeight: '1358px',
    options: {
      title: {
        text: RomanLustrikCardMapOptions.title.text
          ? RomanLustrikCardMapOptions.title.text
          : 'Missing Title',
      },
    },
  },
  {
    section: 'examples',
    order: 2,
    componentName: 'RichInfoClick',
    fakeHeight: '679px',
    options: {
      title: {
        text: RichInfoClickOptions.title.text ? RichInfoClickOptions.title.text : 'Missing Title',
      },
    },
  },
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
export const SECTIONS = Object.keys(groupedCharts)
  .map(section => ({
    sectionTitle: section,
    charts: groupedCharts[section].sort((a, b) => a.order - b.order),
  }))
  .filter(section => (isDev ? true : section.sectionTitle !== 'examples'));
