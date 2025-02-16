/** @import * as z from 'zod'; */
/** @import Highmaps from 'highcharts/highmaps'; */
/** @import * as Schemas from './schemas'; */

/**
 * @typedef {"taskA" | "taskB" | "taskC"} TaskType
 *
 * @typedef {string} Municipality
 * @typedef {number} Year
 * @typedef {number} AgeGroupKey
 *
 * @typedef {z.input<typeof Schemas.dataSchema} OverviewDataInput
 * @typedef {z.output<typeof Schemas.dataSchema>} OverviewDataOutput
 * @typedef {z.infer<typeof Schemas.dataSchema>} OverviewData
 *
 * @typedef {z.input<typeof Schemas.dejavnostSchema>} Dejavnost what we get from the API as property "dejavnost" in Slovenian language
 * @typedef {z.output<typeof Schemas.dejavnostSchema>} DejavnostOutput
 * @typedef {z.infer<typeof Schemas.dejavnostSchema>} DejavnostType
 *
 * @typedef {z.input<typeof Schemas.overviewSchemaTransformed>} OverviewDataTransformedInput
 * @typedef {z.output<typeof Schemas.overviewSchemaTransformed>} OverviewDataTransformedOutput
 * @typedef {z.infer<typeof Schemas.overviewSchemaTransformed>} OverviewDataTransformed
 *
 * @typedef {z.input<typeof Schemas.detailSchemaTransformed>} DetailDataTransformedInput
 * @typedef {z.output<typeof Schemas.detailSchemaTransformed>} DetailDataTransformedOutput
 * @typedef {z.infer<typeof Schemas.detailSchemaTransformed>} DetailDataTransformed
 *
 * @typedef {OverviewDataTransformedOutput["doctorType"]} DoctorType transformed "dejavnost" to camelCase in english
 *
 * @typedef {Object} UserInputsValues
 * @property {DoctorType} doctorType - The type of doctor.
 * @property {number} year - The year.
 * @property {string[]} municipalities - The municipalities.
 *
 * @typedef {Object} CustomHighmapSeriesDataOption
 * @property {number} value - The value of the series data item.
 * @property {boolean} selected - Whether the series data item is selected.
 *
 * @typedef {OverviewDataTransformedOutput & CustomHighmapSeriesDataOption} OverviewDataMapSeriesDataItem
 * @typedef {Exclude<keyof OverviewDataTransformedOutput, "year" | "municipality" | "doctorType">} PropertyAsValue
 * @typedef {DetailDataTransformedOutput & {x: number, y: number}} DetailDataMapSeriesDataItem
 */

/**
 * Represents a map of doctor type overview data, organized by year and doctor type.
 * The key is the year (Year), and the value is a nested map where:
 * - The key is the doctor type (DoctorType).
 * - The value is an array of overview data transformed outputs (OverviewDataTransformedOutput[]).
 *
 * This structure is used to efficiently query doctor data by year and type.
 *
 * @typedef {Map<Year, Map<DoctorType, OverviewDataTransformedOutput[]>>} OverviewByYearAndTypeMap
 */

/**
 * Represents a map of doctor type detail data, organized by municipality, doctor type and age group.
 * The key is the municipality (string), and the value is a nested map where:
 * - The key is the doctor type (DoctorType).
 * - The value is a nested map where:
 *  - The key is the age group (AgeGroupKey).
 * - The value is an array of detail data transformed outputs (DetailDataTransformedOutput[]).
 *
 * This structure is used to efficiently query detail data by municipality, doctor type and age group.
 *
 * @typedef {Map<Municipality, Map<DoctorType, Map<AgeGroupKey, DetailDataTransformedOutput[]>>>} DetailByMunicipalityAndTypeAndAgeGroupMap
 */

/**
 * @typedef {Object} AggregatedYearData
 * @property {number} insuredPeopleCount - Total insured people count.
 * @property {number} insuredPeopleCountWithIOZ - Total insured people count with IOZ.
 * @property {number} insuredPeopleCountWithoutIOZ - Total insured people count with IOZ.
 * @property {number} iozRatio - Ratio of insured people with IOZ to total insured people.
 * @property {string} id - Unique identifier for the aggregation (ageGroup-year).
 * @property {string} name - Name of the age group. // TODO fix this comment, somewhere we are using as serie name
 * @property {number} year - Year of the data point.
 */

/**
 * @typedef {Map<number, AggregatedYearData>} YearDataMap - Map of year to aggregated year data.
 * @typedef {Map<string, YearDataMap>} AggregatedDataMap - Map of age group to year data map.
 */

/**
 * @typedef {Object} LineChartDataOptions
 * @property {x: string, y: number} - The x and y axis properties.
 *
 *
 * @typedef {Object} LineChartSeries
 * @property {string} id - The unique identifier of the series.
 * @property {string} name - The name of the series.
 * @property {(AggregatedYearData & LineChartDataOptions)[]} data - The data points of the series.

 */

export default {};
