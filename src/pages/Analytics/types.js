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
 * @property {"ChartCard" } componentName
 * @property {HighchartsOptions} options
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

/** @typedef {"examples")[]} SectionNames */

/**
 * @typedef {("top" | "top-start" | "start" | "end" | "bottom" | "bottom-start" | "bottom-end" )} Placement
 */

/**
 * @typedef {Object} PopoverCustomOption
 * @property {string} label - The label of the option.
 * @property {React.MouseEventHandler<HTMLButtonElement>} onClick - The function to call when the option is clicked.
 * @property {React.JSX.Element} Icon - The icon to display next to the option.
 */

export default {};
