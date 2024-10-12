/* eslint-disable react/require-default-props */
// Import TypeScript types from the highcharts module
/**
 * @typedef {import('highcharts').Options} HighchartsOptions
 */

/**
 * @typedef {import('highcharts').Chart} HighchartsChart
 */

import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import accessibility from 'highcharts/modules/accessibility';
import exporting from 'highcharts/modules/exporting';
import * as Icons from 'components/Shared/Icons';
import { getIsRequestFullscreenSupported } from 'utils';
import { baseOptions } from './options';
import CustomSeriesButtons from './CustomSeriesButtons';
import Popover from './CustomPopover';

accessibility(Highcharts);
exporting(Highcharts);

Highcharts.setOptions(baseOptions);

/**
 * ChartCard component renders a card with a chart header and children content.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.id - The unique identifier for the chart.
 * @param {HighchartsOptions} props.options - Highcharts options object.he Highcharts chart instance.
 * @returns {JSX.Element} The rendered ChartCard component.
 */
const ChartCard = function ChartCard({ id = undefined, options }) {
  const chartRef = useRef(null);
  const chart = chartRef.current?.chart;
  const [, setInit] = useState(false);

  useEffect(() => {
    // hack to force re-render to get the chart instance
    setInit(true);
  }, []);

  const openFullScreen = () => {
    chart.fullscreen.open();
  };

  const printChart = () => {
    chart.print();
  };

  const isRequestFullscreenSupported = getIsRequestFullscreenSupported(document.documentElement);

  return (
    <div id={id} className="chart-card">
      <header className="chart-header">
        <div>
          <h2>{options?.title?.text}</h2>
          {options?.subtitle?.text ? <h3>{options.subtitle.text}</h3> : null}
        </div>

        <Popover
          placement="bottom-start"
          triggerClassname="icon-button"
          options={[
            isRequestFullscreenSupported
              ? {
                  label: 'Full Screen',
                  onClick: openFullScreen,
                  Icon: Icons.Icon.bind(null, { name: 'FullScreen' }),
                }
              : null,
            {
              label: 'Print',
              onClick: printChart,
              Icon: Icons.Icon.bind(null, { name: 'Print' }),
            },
          ]}
        >
          <Icons.Icon name="VerticalDots" />
        </Popover>
      </header>
      <figure>
        <HighchartsReact
          ref={chartRef}
          highcharts={Highcharts}
          options={options}
          aria-label={chart?.title}
        />
        <div className="chart-series-buttons">
          <CustomSeriesButtons chart={chart} />
        </div>
        <figcaption>{options.caption.text}</figcaption>
      </figure>
    </div>
  );
};

ChartCard.propTypes = {
  id: PropTypes.string,
  options: PropTypes.shape({
    title: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
    subtitle: PropTypes.shape({
      text: PropTypes.string,
    }),
    caption: PropTypes.shape({
      text: PropTypes.string,
    }),
    series: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        visible: PropTypes.bool,
      }),
    ).isRequired,
  }).isRequired,
};

export default ChartCard;
