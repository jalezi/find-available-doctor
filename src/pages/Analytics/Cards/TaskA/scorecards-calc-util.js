/**
 * Calculates yearly statistics for insured people and insured people with IOZ.
 *
 * @param {number} selectedYear - The currently selected year.
 * @param {Array<Object>} chartSeries - Chart series data containing yearly information.
 * @returns {{
 *   currentYear: { insuredPeopleCount: number, insuredPeopleCountWithIOZ: number },
 *   previousYear: { insuredPeopleCount: number, insuredPeopleCountWithIOZ: number },
 *   differences: {
 *     insuredPeopleCount: { diff: number, ratio: number },
 *     insuredPeopleCountWithIOZ: { diff: number, ratio: number },
 *   }
 * }} - Calculated statistics for the current and previous year, including differences and ratios.
 */
export const calculateYearlyStatistics = (selectedYear, chartSeries) => {
  const previousYear = selectedYear - 1;

  const sums = {
    currentYear: {
      insuredPeopleCount: 0,
      insuredPeopleCountWithIOZ: 0,
      insuredPeopleCountWithoutIOZ: 0,
    },
    previousYear: {
      insuredPeopleCount: 0,
      insuredPeopleCountWithIOZ: 0,
      insuredPeopleCountWithoutIOZ: 0,
    },
  };

  chartSeries.forEach(({ data }) => {
    data.forEach(({ year, insuredPeopleCount, insuredPeopleCountWithIOZ }) => {
      if (year === selectedYear) {
        sums.currentYear.insuredPeopleCount += insuredPeopleCount;
        sums.currentYear.insuredPeopleCountWithIOZ += insuredPeopleCountWithIOZ;
        sums.currentYear.insuredPeopleCountWithoutIOZ +=
          insuredPeopleCount - insuredPeopleCountWithIOZ;
      } else if (year === previousYear) {
        sums.previousYear.insuredPeopleCount += insuredPeopleCount;
        sums.previousYear.insuredPeopleCountWithIOZ += insuredPeopleCountWithIOZ;
        sums.previousYear.insuredPeopleCountWithoutIOZ +=
          insuredPeopleCount - insuredPeopleCountWithIOZ;
      }
    });
  });

  const calculateDiffAndRatio = (current, previous) => {
    const diff = current - previous;
    const ratio = previous > 0 ? diff / previous : 0;
    return { diff, ratio };
  };

  return {
    currentYear: sums.currentYear,
    previousYear: sums.previousYear,
    differences: {
      insuredPeopleCount: calculateDiffAndRatio(
        sums.currentYear.insuredPeopleCount,
        sums.previousYear.insuredPeopleCount,
      ),
      insuredPeopleCountWithIOZ: calculateDiffAndRatio(
        sums.currentYear.insuredPeopleCountWithIOZ,
        sums.previousYear.insuredPeopleCountWithIOZ,
      ),
      insuredPeopleCountWithoutIOZ: calculateDiffAndRatio(
        sums.currentYear.insuredPeopleCountWithoutIOZ,
        sums.previousYear.insuredPeopleCountWithoutIOZ,
      ),
    },
  };
};
