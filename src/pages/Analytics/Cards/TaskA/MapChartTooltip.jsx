import { t } from 'i18next';

import styles from './Tooltip.module.css';

/* eslint-disable react/prop-types */
export function MapChartTooltip({ point }) {
  const intlFormat = new Intl.NumberFormat('sl', { maximumFractionDigits: 2 });

  const tCommon = t('analytics.common', { returnObjects: true });
  return (
    <div>
      <div>
        {point.municipality}, {point.year}, {tCommon.doctorTypes[point.doctorType]}
      </div>
      <table className={styles.TooltipTable}>
        <thead>
          <tr>
            <th className={styles.Center}>{tCommon.data.insuredPeopleCount}</th>
            <th className={styles.Center}>{tCommon.data.insuredPeopleCountWithoutIOZ}</th>
            <th className={styles.Center}>{tCommon.data.iozRatio}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.Right}>{intlFormat.format(point.insuredPeopleCount)}</td>
            <td className={styles.Right}>
              {intlFormat.format(point.insuredPeopleCountWithoutIOZ)}
            </td>
            <td className={styles.Right}>{intlFormat.format(point.iozRatio)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
