export const sectionNames = Object.freeze([
  'Analitični prikaz podatkov o dostopnosti do primarne zdravstvene oskrbe',
  'examples',
]);

/**
 * @typedef {typeof sectionNames[number]} SectionNames
 */

/**
 * @typedef {import('highcharts-react-official').HighchartsReactRefObject} HighchartsReactRefObject
 */

/**
 * @typedef {import('highcharts-react-official').HighchartsReactProps} HighchartsReactProps
 */

/**
 * @typedef {HighchartsReactRefObject["chart"]} ChartRefProperty
 */

/**
 * @typedef {import('highcharts').Options} HighchartsOptions
 */

/**
 * @typedef {import('highcharts/highmaps').Options} HighMapsOptions
 */

/**
 * @typedef {Object} ChartData
 * @property {SectionNames[number]} section
 * @property {number} order
 * @property {string} id
 * @property {string} titleTranslationKey
 * @property {"ChartCard" } componentName
 * @property {React.CSSProperties["minHeight"] fakeHeight
 */

/**
 * @typedef {Object} MapData
 * @property {SectionNames[number]} section
 * @property {number} order
 * @property {string} id
 * @property {"MapCard"} componentName
 * @property {HighMapsOptions} options
 */

/**
 * @typedef {("top" | "top-start" | "start" | "end" | "bottom" | "bottom-start" | "bottom-end" )} Placement
 */

/**
 * @typedef {Object} PopoverCustomOption
 * @property {string} label - The label of the option.
 * @property {React.MouseEventHandler<HTMLButtonElement>} onClick - The function to call when the option is clicked.
 * @property {React.JSX.Element} Icon - The icon to display next to the option.
 */

/**
 * @typedef {Object} Section
 * @property {string} section
 * @property {number} order
 * @property {string} componentName
 * @property {string} titleTranslationKey
 * @property {React.CSSProperties["minHeight"]} fakeHeight
 * @property {string} [title]
 */

export default {};
