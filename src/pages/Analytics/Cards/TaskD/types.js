/**
 * @typedef {"gynDoseganjePovprecja" | "gynObseg" | "gpGlavarinaMean" | "gpGlavarina" | "gpObseg" | "denDoseganjePovprecja" | "denObseg"} FileKey
 *
 * @typedef {Object} JsonItem - The JSON item object.
 * @property {string} datum - The date string.
 * @property {number} javni - The public value.
 * @property {number} zasebni - The private value.
 *
 * @typedef {Object} Option
 * @property {string} name
 * @property {string} label
 * @property {string} value
 * @property {string} group
 *
 * @typedef {Object} GroupOption
 * @property {string} label
 * @property {Option[]} options
 *
 * @typedef {Object} FilterState
 * @property {string} data
 * @property {string} group
 *
 * @typedef {number} Timestamp
 *
 * @typedef {[Timestamp, number]} ParsedDataItem - The parsed data item as a tuple of timestamp and value.
 *
 * @typedef {Object} ParsedData - The parsed data object.
 * @property {ParsedDataItem[]} public - The public data.
 * @property {ParsedDataItem[]} private - The private data.
 */

/**
 * @typedef {typeof  import("./parsed-files").groupYAxisLabelFormat} YAxisLabelFormat
 * @typedef {YAxisLabelFormat[FileKey]} YAxisLabelFormatValue
 */

export default {};
