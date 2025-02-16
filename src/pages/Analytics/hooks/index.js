import { useState } from 'react';

/**
 * A custom React hook for managing a filter state object.
 *
 * @template T - The shape of the filter state.
 * @param {T} initialState - The initial state of the filter.
 * @returns {{
 *   filterState: T, // The current filter state.
 *   setFilterState: React.Dispatch<React.SetStateAction<T>>, // Function to update the filter state.
 *   onFilterChange: (key: keyof T, value: T[keyof T]) => void // Function to update a specific key in the filter state.
 * }} - The filter state management functions and state.
 */
export const useFilterState = initialState => {
  const [filterState, setFilterState] = useState(initialState);

  const onFilterChange = e => {
    const { name, value } = e.target;
    setFilterState(prev => ({ ...prev, ...e.target, [name]: value }));
  };

  return { filterState, setFilterState, onFilterChange };
};
