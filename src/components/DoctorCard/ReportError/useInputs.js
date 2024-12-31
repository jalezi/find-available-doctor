import { useState } from 'react';
// not sure if this is the best way to do this
/**
 * Add this type in top of your file, or if commonly used in some types file.
 * @template T
 * @typedef {[T, import('react').Dispatch<import('react').SetStateAction<T>>]} useState
 */

/**
 * @typedef {Object} Inputs
 * @property {string} address - The address input value.
 * @property {string} accepts - The accepts input value.
 * @property {string} availability - The availability input value.
 * @property {string} phone - The phone input value.
 * @property {string} website - The website input value.
 * @property {string} email - The email input value.
 * @property {string} orderform - The orderform input value.
 * @property {string} note - The note input value.
 */

/**
 * @typedef {Inputs} InitialValues
 */

/**
 * Custom hook for managing input values.
 *
 * @param {InitialValues} initialValues - The initial values for the inputs.
 */
export function useInputs(initialValues) {
  /** @type useState<string> */
  const [inputAddress, setInputAddress] = useState(initialValues.address);
  /** @type useState<string> */
  const [inputAccepts, setInputAccepts] = useState(initialValues.accepts);
  /** @type useState<string> */
  const [inputAvailability, setInputAvailability] = useState(initialValues.availability);
  /** @type useState<string> */
  const [inputPhone, setInputPhone] = useState(initialValues.phone);
  /** @type useState<string> */
  const [inputWebsite, setInputWebsite] = useState(initialValues.website);
  /** @type useState<string> */
  const [inputEmail, setInputEmail] = useState(initialValues.email);
  /** @type useState<string> */
  const [inputOrderform, setInputOrderform] = useState(initialValues.orderform);
  /** @type useState<string> */
  const [inputNote, setInputNote] = useState(initialValues.note);

  return {
    address: [inputAddress, setInputAddress],
    accepts: [inputAccepts, setInputAccepts],
    availability: [inputAvailability, setInputAvailability],
    phone: [inputPhone, setInputPhone],
    website: [inputWebsite, setInputWebsite],
    email: [inputEmail, setInputEmail],
    orderform: [inputOrderform, setInputOrderform],
    note: [inputNote, setInputNote],
  };
}
