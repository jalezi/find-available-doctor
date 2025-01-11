/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */

/** @import * as Types from "../../types" */

import { useEffect, useRef, useState } from 'react';
import HighMaps from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';

import * as Icons from 'components/Shared/Icons';
import { getIsRequestFullscreenSupported } from 'utils';
import CustomSeriesButtons from '../../components/CustomSeriesButtons';

import styles from '../Cards.module.css';
import ChartHeader from '../../components/chart-header';
import { Card, CardContent } from '../../components/ui/card';

/**
 * MapCard component renders a HighMaps chart with optional series buttons and fullscreen/print functionality.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {React.ComponentProps<"article">["id"]} props.id - The unique identifier for the card.
 * @param {React.ComponentProps<"article">["className"]} props.className - The class name for the card. Defaults to an empty string.
 * @param {Types.HighMapsOptions} props.options - The HighMaps options object.
 * @param {boolean} [props.showSeriesButtons=false] - Flag to show or hide series buttons.
 * @returns {JSX.Element} The rendered MapCard component.
 */
const MapCard = function MapCard({
  id = undefined,
  className = '',
  options,
  showSeriesButtons = false,
}) {
  const [chartOptions] = useState(options);
  /** @type {React.RefObject<(Types.HighchartsReactRefObject | null)>} */
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
    <Card id={id} className={className} as="article">
      <ChartHeader
        title={options?.title?.text}
        subtitle={options?.subtitle?.text}
        popoverOptions={[
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
      />
      <CardContent>
        <figure>
          <HighchartsReact
            ref={chartRef}
            highcharts={HighMaps}
            constructorType="mapChart"
            options={chartOptions}
            aria-label={chart?.title}
          />
          {showSeriesButtons ? (
            <div className={styles.SeriesButtons}>
              <CustomSeriesButtons chart={chart} />
            </div>
          ) : null}
          <figcaption className="highcharts-description">{options.caption.text}</figcaption>
        </figure>
      </CardContent>
    </Card>
  );
};

export default MapCard;
