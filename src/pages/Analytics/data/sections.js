/** @import * as Types from "../types" */

import { sectionNames } from '../types';

export const sectionTranslationKeys = sectionNames.reduce((acc, sectionName, index) => {
  acc[sectionName] = `analytics.sectionTitle.${index + 1}`;
  return acc;
}, {});

/**
 * TODO
 *  - check for actual fake height values; card height can be different on mobile or desktop or other devices:
 *  fakeHeight is needed to simulate the height of the card in the editor so the scrolling is correct if card is not rendered yet
 *  and user navigates to it via the sidebar
 *
 */

const isDev = process.env.NODE_ENV === 'development';

/**
 * @type {Types.Section[]}
 */
export const cards = [
  {
    section: sectionNames[0],
    order: 0,
    componentName: 'TaskSpecial',
    titleTranslationKey: 'analytics.taskSpecial.title',
    fakeHeight: '583px', // TODO: check for actual fake height value,
  },
  {
    section: sectionNames[0],
    order: 1,
    componentName: 'TaskA',
    titleTranslationKey: 'analytics.taskA.title',
    fakeHeight: '935px', // TODO: check for actual fake height value,
  },
  {
    section: sectionNames[0],
    order: 2,
    componentName: 'TaskATrend',
    titleTranslationKey: 'analytics.taskATrend.title',
    fakeHeight: '585px', // TODO: check for actual fake height value,
  },
  {
    section: sectionNames[0],
    order: 3,
    componentName: 'TaskD',
    titleTranslationKey: 'analytics.taskD.title',
    fakeHeight: '584px', // TODO: check for actual fake height value
  },
];

const groupedCards = cards.reduce((acc, card) => {
  const { section } = card;
  if (!acc[section]) {
    acc[section] = [];
  }
  acc[section].push(card);
  return acc;
}, {});

/**
 * @type {Array<{sectionTitle: Types.SectionNames[number], cards: Types.Section[]}>}
 */
export const SECTIONS = Object.keys(groupedCards)
  .map(section => ({
    sectionTitle: section,
    cards: groupedCards[section].sort((a, b) => a.order - b.order),
  }))
  .filter(section => (isDev ? true : section.sectionTitle !== 'examples'));
