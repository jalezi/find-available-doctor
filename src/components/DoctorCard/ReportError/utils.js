/**
 * Object containing the form field IDs.
 * @typedef {Object} FormFieldIds
 * @property {string} name - The ID for the input field representing the name.
 * @property {string} url - The ID for the input field representing the URL.
 * @property {string} type - The ID for the input field representing the type.
 * @property {string} instId - The ID for the input field representing the institution ID.
 * @property {string} provider - The ID for the input field representing the provider.
 * @property {string} address - The ID for the input field representing the full address.
 * @property {string} accepts - The ID for the input field representing the accepts field.
 * @property {string} availability - The ID for the input field representing the availability.
 * @property {string} website - The ID for the input field representing the website.
 * @property {string} phone - The ID for the input field representing the phone number.
 * @property {string} email - The ID for the input field representing the email.
 * @property {string} orderform - The ID for the input field representing the order form.
 * @property {string} note - The ID for the input field representing the note.
 */

/**
 * An array of the hidden form field names.
 * @constant {string[]} - An array of the hidden form field names.
 * @default
 */
export const HIDDEN_FIELDS = ['name', 'url', 'type', 'instId', 'provider'];

const name = import.meta.env.VITE_REACT_APP_GOOGLE_FORM_INPUT_NAME;
const url = import.meta.env.VITE_REACT_APP_GOOGLE_FORM_INPUT_URL;
const type = import.meta.env.VITE_REACT_APP_GOOGLE_FORM_INPUT_TYPE;
const instId = import.meta.env.VITE_REACT_APP_GOOGLE_FORM_INPUT_INSTID;
const provider = import.meta.env.VITE_REACT_APP_GOOGLE_FORM_INPUT_PROVIDER;
const address = import.meta.env.VITE_REACT_APP_GOOGLE_FORM_INPUT_ADDRESS;
const accepts = import.meta.env.VITE_REACT_APP_GOOGLE_FORM_INPUT_ACCEPTS;
const availability = import.meta.env.VITE_REACT_APP_GOOGLE_FORM_INPUT_AVAILABILITY;
const website = import.meta.env.VITE_REACT_APP_GOOGLE_FORM_INPUT_WEBSITE;
const phone = import.meta.env.VITE_REACT_APP_GOOGLE_FORM_INPUT_PHONE;
const email = import.meta.env.VITE_REACT_APP_GOOGLE_FORM_INPUT_EMAIL;
const orderform = import.meta.env.VITE_REACT_APP_GOOGLE_FORM_INPUT_ORDERFORM;
const note = import.meta.env.VITE_REACT_APP_GOOGLE_FORM_INPUT_NOTE;

/**
 * Retrieves the Google Sheet form field IDs.
 * @returns {FormFieldIds} The form field IDs.
 */
export function getGSheetFormFieldIds() {
  return {
    name,
    url,
    type,
    instId,
    provider,
    address,
    accepts,
    availability,
    website,
    phone,
    email,
    orderform,
    note,
  };
}

const formId = import.meta.env.VITE_REACT_APP_GOOGLE_FORM_ID;

/**
 * Retrieves the Google Sheet form URL.
 * @returns {string} The form URL.
 *
 * */
export function getGSheetFormUrl() {
  return `https://docs.google.com/forms/d/${formId}/formResponse`;
}

/**
 * Generates form field names with an optional prefix.
 *
 * @param {string} appended [appended = "entry."] - The prefix to be appended to each form field name.
 * @returns {FormFieldIds} - An object containing form field names.
 */
export function makeInputNames(appended = 'entry.') {
  /**
   * @type {FormFieldIds} - An object containing form field names.
   */
  const obj = {};
  const formFieldIds = getGSheetFormFieldIds();

  return Object.keys(formFieldIds).reduce((acc, key) => {
    acc[key] = appended + formFieldIds[key];
    return acc;
  }, obj);
}

/**
 * Checks if the input value has changed from the initial value.
 * @param {string} input - The input value to check.
 * @param {string} initialValue - The initial value to compare against.
 * @returns {string} - An empty string if the input value is equal to the initial value, otherwise the input value.
 */
export function getChangedValue(input, initialValue) {
  return input === initialValue ? '' : input;
}

/**
 * Checks if the input value has changed from the initial value.
 *
 * @param {string} input - The current input value.
 * @param {string} initialValue - The initial value.
 * @returns {boolean} - True if the input value has changed, false otherwise.
 */
export function isValueChanged(input, initialValue) {
  return input !== initialValue;
}

// FIXME - some properties are missing
/**
 * Doctor object.
 *
 * @typedef {Object} Doctor
 * @property {string} name - The name of the doctor.
 * @property {string} url - The URL of the doctor.
 * @property {string} type - The type of the doctor.
 * @property {string} instId - The institution ID of the doctor.
 * @property {string} provider - The provider of the doctor.
 * @property {string} fullAddress - The full address of the doctor.
 * @property {string} accepts - The accepts field of the doctor.
 * @property {string} availability - The availability of the doctor.
 * @property {string} website - The website of the doctor.
 * @property {string} phone - The phone number of the doctor.
 * @property {string} email - The email of the doctor.
 * @property {string} orderform - The order form of the doctor.
 * @property {string} note - The note of the doctor.
 * @property {string} [message] - The message to display after submitting the form.
 */

/**
 * @typedef {Object} HiddenFields
 * @property {string} name - The name of the doctor.
 * @property {string} url - The URL of the doctor.
 * @property {string} type - The type of the doctor.
 * @property {string} instId - The institution ID of the doctor.
 * @property {string} provider - The provider of the doctor.
 */

/**
 * Returns an object containing the hidden values of a doctor.
 *
 * @param {Doctor} doctor - The doctor object.The provider of the doctor.
 * @returns {HiddenFields} - An object containing the hidden values.
 */
export function getHiddenValues(doctor) {
  return {
    name: doctor.name,
    url: doctor.url,
    type: doctor.type,
    instId: doctor.instId,
    provider: doctor.provider,
  };
}

/**
 * Flips the key-value pairs of an object.
 * @param {Object.<string, string>} obj - The object to flip.
 * @returns {Object.<string, string>} - The flipped object.
 */
export function flipKeyValue(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[obj[key]] = key;
    return acc;
  }, {});
}
