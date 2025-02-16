/** @import * as Types "../../../types" */
/** @import * as TaskATypes from "./types" */

import { useEffect } from 'react';

/**
 *
 * @param {Object} params
 * @param {React.Dispatch<React.SetStateAction<TaskATypes.UserInputsValues>>} params.initialFilterState
 * @param {React.Dispatch<React.SetStateAction<Types.HighMapsOptions>>} params.setFilterState
 * @param {boolean} params.init
 * @param {Highcharts.Chart} params.mapChart
 * @returns {void}
 */
export const useMapChart = ({ setMapChartOptions, setFilterState, init, mapChart }) => {
  useEffect(() => {
    if (!init) return;
    setMapChartOptions({
      plotOptions: {
        series: {
          point: {
            events: {
              select() {
                const sPoints = mapChart?.getSelectedPoints();
                setFilterState(prev => ({
                  ...prev,
                  municipalities: sPoints.map(p => p.municipality),
                }));
              },
              unselect() {
                const sPoints = mapChart?.getSelectedPoints();
                setFilterState(prev => ({
                  ...prev,
                  municipalities: sPoints.map(p => p.municipality),
                }));
              },
            },
          },
        },
      },
    });
  }, [init, mapChart, setFilterState, setMapChartOptions]);
};
