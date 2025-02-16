/** @import * as TaskAType from './Cards/prod/TaskA/types.js' */

/**
 * @constant AGE_GROUPS
 * @description Age groups for each task
 * @type {Record<TaskAType.TaskType, Record<TaskAType.DoctorType, Record<string | number, string>>}
 */
export const AGE_GROUPS = Object.freeze({
  taskA: {
    den: {
      1: '0-18',
      2: '19-25',
      3: '25+',
    },
    gp: {
      1: '0',
      2: '1-6',
      3: '7-18',
      4: '19-49',
      5: '50-64',
      6: '65-74',
      7: '75+',
    },
    gyn: {
      1: '13-19',
      2: '20-39',
      3: '40-64',
      4: '65+',
    },
    dso: {
      1: '0',
      2: '1-6',
      3: '7-18',
      4: '19-49',
      5: '50-64',
      6: '65-74',
      7: '75+',
    },
    betterAccessibility: {
      1: '0',
      2: '1-6',
      3: '7-18',
      4: '19-49',
      5: '50-64',
      6: '65-74',
      7: '75+',
    },
  },
});

/**
 * Creates a function to get the age group string for a given task, doctor type, and age group.
 *
 * @param {TaskAType.TaskType} task - The task type.
 * @returns {function(TaskAType.DoctorType, string | number): string} - A function that takes a doctor type and age group, and returns the corresponding age group string.
 */
const createGetAgeGroupString = task => (doctorType, ageGroup) =>
  AGE_GROUPS[task][doctorType][ageGroup];

export const getTaskAAgeGroupString = createGetAgeGroupString('taskA');

export const CHART_COLORS = Object.freeze({
  chart: {
    backgroundColor: 'rgb(255, 255, 255)',
  },
  tooltip: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
