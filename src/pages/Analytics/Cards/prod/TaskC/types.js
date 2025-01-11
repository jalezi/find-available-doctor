/** @import * as Types from "../../../data/fake-data" */

/**
 * @typedef {("gp" | "den" | "gyn")} DoctorType - The type of practice that doctor provides.
 *
 * @typedef {("assigned" | "unassigned")} AssignedType - The type of assignment.
 *
 * @typedef {("public" | "private")} ContractType - The type of contract.
 *
 * @typedef {Object} InsuredData
 * @property {string} municipality - Municipality name.
 * @property {number} year - The year.
 * @property {Types.AgeGroup} ageGroup - The age group.
 * @property {DoctorType} doctorType - The type of doctor.
 * @property {number} value - The number of people with doctor assigned to them.
 * @property {AssignedType} assignedType - The type of assignment.
 * @property {ContractType} contractType - The type of contract.
 *
 * @typedef {Object} UserInputsValues
 * @property {string} municipality - Municipality name.
 * @property {string} year - The year.
 * @property {(Types.AgeGroup)} ageGroup - The age group.
 * @property {(DoctorType)} doctorType - The type of doctor.
 * @property {(AssignedType | "all")} assignedType - The type of assignment.
 * @property {(ContractType | "all")} contractType - The type of contract.
 *
 * @typedef {Object} FilterOptions
 * @property {string[]} municipalities - The list of municipalities.
 * @property {number[]} years - The list of years.
 * @property {Types.AgeGroup[]} ageGroups - The list of age groups.
 * @property {DoctorType[]} doctorTypes - The list of doctor types.
 * @property {AssignedType[]} assignedTypes - The list of assigned types.
 * @property {ContractType[]} contractTypes - The list of contract types.
 *
 */

export default {};
