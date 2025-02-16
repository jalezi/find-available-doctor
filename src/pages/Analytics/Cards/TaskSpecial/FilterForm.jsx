/* eslint-disable react/prop-types */
import { forwardRef } from 'react';

import { t } from 'i18next';
import Label from 'pages/Analytics/components/Label';
import CustomReactSelect from 'pages/Analytics/components/Select';

const FilterForm = forwardRef(
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

      onChange({
        target: {
          name: e.name,
          value: e?.value ?? '',
        },
      });
    };
    return (
      <form ref={ref}>
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

FilterForm.displayName = 'FilterForm';

export default FilterForm;
