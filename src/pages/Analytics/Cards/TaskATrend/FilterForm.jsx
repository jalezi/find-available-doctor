/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/** @import * as Types from "./types" */
/** @typedef {import('react-select').ValueContainerProps} ValueContainerProps */

import { forwardRef } from 'react';

import { cx } from 'class-variance-authority';
import { t } from 'i18next';
import { components } from 'react-select';

import Label from 'pages/Analytics/components/Label';
import CustomReactSelect from 'pages/Analytics/components/Select';

import styles from '../FilterForm.module.css';

/**
 * CustomValueContainer component for react-select
 * Displays "clear all" text when there are selected values and not focused,
 * shows search input when focused or no values selected
 *
 * @param {ValueContainerProps & {text: string, clearAllClassName?: string}} props - Component props from react-select ValueContainerProps
 * @returns {JSX.Element} Rendered value container
 */
export function CustomValueContainer(props) {
  const { children, text, clearAllClassName, ...restProps } = props;

  const { hasValue } = restProps;
  const { menuIsOpen } = restProps.selectProps;

  const value = restProps.getValue();
  const valueCount = value ? value.length : 0;

  return (
    <components.ValueContainer
      hasValue={hasValue}
      {...restProps}
      className={cx(!hasValue && styles.HasValue)}
    >
      {hasValue && !menuIsOpen ? (
        <span className={cx(clearAllClassName)}>
          ({valueCount}) {text}
        </span>
      ) : null}
      {children}
    </components.ValueContainer>
  );
}

export const FilterForm = forwardRef(
  (
    {
      filterState,
      onChange,
      filterOptions = {
        doctorTypes: [],
      },
    },
    ref,
  ) => {
    const tCommon = t('analytics.common', { returnObjects: true });
    const { doctorTypes: doctorTypesTranslations } = tCommon;

    const onFormChange = e => {
      if (e?.target) {
        onChange(e);
        return;
      }

      const value = e.name === 'year' ? Number(e?.value ?? '') : (e?.value ?? '');
      onChange({
        target: {
          name: e.name,
          value,
        },
      });
    };

    return (
      <form ref={ref} action="" className={styles.FilterForm}>
        <div>
          <Label htmlFor="doctorType">{tCommon.doctorType}</Label>
          <CustomReactSelect
            styles={{
              input: base => ({
                ...base,
                minWidth: '28ch',
              }),
            }}
            name="doctorType"
            id="doctorType"
            value={{
              name: 'doctorType',
              label: doctorTypesTranslations[filterState.doctorType],
              value: filterState.doctorType,
            }}
            onChange={onFormChange}
            options={filterOptions.doctorTypes.map(doctorType => ({
              name: 'doctorType',
              label: doctorTypesTranslations[doctorType],
              value: doctorType,
            }))}
          />
        </div>
      </form>
    );
  },
);
