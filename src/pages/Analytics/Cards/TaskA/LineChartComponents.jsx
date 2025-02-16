/* eslint-disable react/prop-types */

import { t } from 'i18next';

import styles from './Tooltip.module.css';

export const LineChartTooltip = function LineChartTooltip({ points, x }) {
  const intlFormat = new Intl.NumberFormat('sl');
  const tCommon = t('analytics.common', { returnObjects: true });

  return (
    <div>
      <b>{tCommon.year}:</b> {x}
      <table className={styles.TooltipTable}>
        <thead>
          <tr>
            <th className={styles.Center}>{tCommon.ageGroup}</th>
            <th className={styles.Center}>{tCommon.data.insuredPeopleCount}</th>
            <th className={styles.Center}>{tCommon.data.insuredPeopleCountWithoutIOZ}</th>
          </tr>
        </thead>
        <tbody>
          {points.map(point => {
            const { options } = point.point;
            const totalInsured = intlFormat.format(options.insuredPeopleCount);
            const insuredWithoutIOZ = intlFormat.format(options.insuredPeopleCountWithoutIOZ);
            return (
              <tr key={point.series.name}>
                <td className={styles.Center}>
                  <span className={styles.SeriesLabel}>
                    <span
                      className={styles.SeriesIndicator}
                      style={{ backgroundColor: point.series.color }}
                    />
                    {point.series.name}
                  </span>
                </td>
                <td className={styles.Right}>{totalInsured}</td>
                <td className={styles.Right}>{insuredWithoutIOZ}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const LineChartYAxisTitle = function LineChartYAxisTitle() {
  const tTaskA = t('analytics.taskA', { returnObjects: true });
  return tTaskA.yAxis.title;
};
