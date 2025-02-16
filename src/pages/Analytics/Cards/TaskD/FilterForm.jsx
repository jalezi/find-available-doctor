/* eslint-disable react/prop-types */
import { t } from 'i18next';

import Label from 'pages/Analytics/components/Label';
import CustomReactSelect from 'pages/Analytics/components/Select';

import { groupOptions } from './parsed-files';

function formatGroupLabel(data) {
  return (
    <div>
      <span>{data.label}</span>
      <span>{data.options.length}</span>
    </div>
  );
}

/**
 * FilterForm component for selecting data options
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.filterState - The current filter state
 * @param {number} props.filterState.data - The current data value
 * @param {string} props.filterState.group - The current group value
 * @param {Function} props.onChange - The function to handle form changes.
 * @returns {JSX.Element} The rendered FilterForm component.
 */
const FilterForm = function FilterForm({ filterState, onChange }) {
  const tCommon = t('analytics.common', { returnObjects: true });
  const { data: tData } = tCommon;

  // eslint-disable-next-line no-shadow
  const translatedOptions = groupOptions.map(option => ({
    ...option,
    label: tData[option.label],
    options: option.options.map(o => ({ ...o, label: tData[o.label] })),
  }));

  const { group } = filterState;
  const isCapitation = group === 'capitation';
  const label = isCapitation
    ? tData[filterState.data]
    : `${tData[filterState.group]}: ${tData[filterState.data]}`;

  const onFormChange = e => {
    if (e?.target) {
      onChange(e);
      return;
    }

    onChange({
      target: {
        name: e.name,
        value: e.value,
        group: e.group,
      },
    });
  };

  return (
    <form>
      <Label htmlFor="data">Data</Label>
      <CustomReactSelect
        id="data"
        name="data"
        value={{
          name: 'data',
          label,
          value: filterState.data,
        }}
        onChange={onFormChange}
        options={translatedOptions}
        // eslint-disable-next-line react/no-unstable-nested-components
        formatGroupLabel={formatGroupLabel}
      />
    </form>
  );
};

export default FilterForm;
