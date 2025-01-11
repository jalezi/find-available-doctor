/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/** @import * as Types from "./types" */

import CustomReactSelect from 'pages/Analytics/components/CustomReactSelect';
import { forwardRef } from 'react';

import Label from 'pages/Analytics/components/Label';
import { ASSIGNED_TYPES_MAP, CONTRACT_TYPES_MAP, DOCTOR_TYPES_MAP } from './data';

import styles from '../FilterForm.module.css';

export const FilterForm = forwardRef(
  (
    {
      filterState,
      onChange,
      filterOptions = {
        municipalities: [],
        years: [],
        ageGroups: [],
        doctorTypes: [],
        assignedTypes: [],
        contractTypes: [],
      },
    },
    ref,
  ) => {
    const onFormChange = e => {
      if (e?.target) {
        onChange(e);
        return;
      }

      onChange({
        target: {
          name: e.name,
          value: e?.value ?? '',
        },
      });
    };

    return (
      <form ref={ref} action="" className={styles.FilterForm}>
        <div>
          <Label htmlFor="municipality">Občina</Label>
          <CustomReactSelect
            styles={{
              input: base => ({
                ...base,
                minWidth: '28ch',
              }),
            }}
            name="municipality"
            id="municipality"
            value={{
              name: 'municipality',
              label: filterState.municipality,
              value: filterState.municipality,
            }}
            onChange={onFormChange}
            options={filterOptions.municipalities.map(municipality => ({
              name: 'municipality',
              value: municipality,
              label: municipality,
            }))}
            isSearchable
          />
        </div>
        <div>
          <Label htmlFor="year">Leto</Label>
          <CustomReactSelect
            name="year"
            id="year"
            value={{ name: 'year', value: filterState.year, label: filterState.year }}
            onChange={onFormChange}
            options={filterOptions.years
              .sort((a, b) => b - a)
              .map(year => ({ value: year, label: year, name: 'year' }))}
          />
        </div>
        <div>
          <Label htmlFor="ageGroup">Skupina</Label>
          <CustomReactSelect
            styles={{
              input: base => ({ ...base, minWidth: '5ch' }),
            }}
            name="ageGroup"
            id="ageGroup"
            value={{ name: 'ageGroup', value: filterState.ageGroup, label: filterState.ageGroup }}
            onChange={onFormChange}
            options={filterOptions.ageGroups.map(ageGroup => ({
              value: ageGroup,
              label: ageGroup,
              name: 'ageGroup',
            }))}
          />
        </div>
        <div>
          <Label htmlFor="doctorType">Zdravnik</Label>
          <CustomReactSelect
            styles={{ input: base => ({ ...base, minWidth: '14ch' }) }}
            name="doctorType"
            id="doctorType"
            value={{
              name: 'doctorType',
              value: filterState.doctorType,
              label: DOCTOR_TYPES_MAP[filterState.doctorType],
            }}
            onChange={onFormChange}
            options={filterOptions.doctorTypes.map(doctorType => ({
              value: doctorType,
              label: DOCTOR_TYPES_MAP[doctorType],
              name: 'doctorType',
            }))}
            isSearchable
          />
        </div>
        <div>
          <Label htmlFor="contractType">Status</Label>
          <CustomReactSelect
            styles={{
              input: base => ({ ...base, minWidth: '8ch' }),
            }}
            name="contractType"
            id="contractType"
            value={{
              name: 'contractType',
              value: filterState.contractType,
              label: CONTRACT_TYPES_MAP[filterState.contractType],
            }}
            onChange={onFormChange}
            options={[
              { value: 'all', label: 'Vsi', name: 'contractType' },
              ...filterOptions.contractTypes.map(contractType => ({
                value: contractType,
                label: CONTRACT_TYPES_MAP[contractType],
                name: 'contractType',
              })),
            ]}
          />
        </div>
        <div>
          <Label htmlFor="assignedType">Opredeljenost</Label>
          <CustomReactSelect
            styles={{
              input: base => ({ ...base, minWidth: '12ch' }),
            }}
            name="assignedType"
            id="assignedType"
            value={{
              name: 'assignedType',
              value: filterState.assignedType,
              label: ASSIGNED_TYPES_MAP[filterState.assignedType],
            }}
            onChange={onFormChange}
            options={[
              { value: 'all', label: 'Vsi', name: 'assignedType' },
              ...filterOptions.assignedTypes.map(assignedType => ({
                value: assignedType,
                label: ASSIGNED_TYPES_MAP[assignedType],
                name: 'assignedType',
              })),
            ]}
          />
        </div>
      </form>
    );
  },
);

FilterForm.displayName = 'FilterForm';
