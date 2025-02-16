import { useEffect, useMemo, useState } from 'react';

import { t } from 'i18next';
import loMerge from 'lodash/merge';

import { useParams } from 'react-router';
import { prepareTaskDChartOptions } from './data';

export const useChart = (initialOptions, { filterState }) => {
  const { lng } = useParams();

  const chartTransaltions = useMemo(() => t(`analytics.taskD.chart`, { returnObjects: true }), []);

  const memoChartOptions = useMemo(
    () =>
      prepareTaskDChartOptions({
        filterState,
        translations: chartTransaltions,
        lng,
      }),
    [chartTransaltions, filterState, lng],
  );

  const [chartOptions, setChartOptions] = useState(loMerge(memoChartOptions, initialOptions));

  useEffect(() => {
    setChartOptions(memoChartOptions);
  }, [memoChartOptions]);

  return { chartOptions, setChartOptions };
};
