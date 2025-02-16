/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { cx } from 'class-variance-authority';
import { useState } from 'react';
import Select from 'react-select';

import styles from './Select.module.css';

/**
 * Custom React Select component
 * A custom-styled React Select component.
 * Tried to keep the styles as close as possible to the current Search input on main page.
 * I also added a state to control the menu open/close.
 *
 * I used unstyled prop to remove the default styles and then added custom styles.
 * React Select Inner Components that are not styled are:
 *
 * clearIndicator,
 * container,
 * group,
 * loadingIndicator,
 * loadingMessage,
 * menuPortal,
 * multiValue,
 * multiValueLabel,
 * multiValueRemove,
 * placeholder,
 * singleValue,
 * valueContainer
 *
 * @see https://react-select.com/styles#inner-components
 *
 * @param {React.ComponentProps<Select>} props - The properties object.
 * @returns {JSX.Element} The rendered CustomReactSelect component.
 */
const CustomReactSelect = function CustomReactSelect(props) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <Select
      unstyled
      className={styles.ReactSelect}
      classNamePrefix="Select"
      classNames={{
        clearIndicator: () => styles.ReactSelectClearIndicator,
        control: state =>
          cx(styles.ReactSelectControl, state.isFocused && styles.ReactSelectControlIsFocused),
        dropdownIndicator: () =>
          cx(
            styles.ReactSelectDropdownIndicator,
            menuIsOpen && styles.ReactSelectDropdownIndicatorIsOpen,
          ),
        group: () => styles.ReactSelectGroup,
        groupHeading: () => styles.ReactSelectGroupHeading,
        indicatorsContainer: () => styles.ReactSelectIndicatorContainer,
        indicatorSeparator: () => styles.ReactSelectIndicatorSeparator,
        input: () => styles.ReactSelectInput,
        menu: () => styles.ReactSelectMenu,
        menuList: () => styles.ReactSelectMenuList,
        multiValue: () => styles.ReactSelectMultiValue,
        multiValueLabel: () => styles.ReactSelectMultiValueLabel,
        multiValueRemove: () => styles.ReactSelectMultiValueRemove,

        noOptionsMessage: () => styles.ReactSelectNoOptionsMessage,
        option: state =>
          cx(
            styles.ReactSelectOption,
            state.isFocused && styles.ReactSelectOptionIsFocused,
            state.isSelected && styles.ReactSelectOptionIsSelected,
          ),
        valueContainer: () => styles.ReactSelectValueContainer,
      }}
      onMenuOpen={() => setMenuIsOpen(true)}
      onMenuClose={() => setMenuIsOpen(false)}
      {...props}
    />
  );
};
export default CustomReactSelect;
