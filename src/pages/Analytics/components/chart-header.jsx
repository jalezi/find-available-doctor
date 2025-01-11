/* eslint-disable react/prop-types */
/** @import * as CustomPopoverTypes from '../types' */

import * as Icons from 'components/Shared/Icons';
import Popover from 'pages/Analytics/components/CustomPopover';

import stylesIconButton from '../IconButton.module.css';
import { CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

/**
 * @component
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.subtitle
 * @param {CustomPopoverTypes.PopoverCustomOption[]} props.popoverOptions
 * @returns
 */
const ChartHeader = function ChartHeader({ title, subtitle, popoverOptions }) {
  const showPopover = popoverOptions?.length && popoverOptions.length > 0;
  return (
    <>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardTitle variant="subtitle">{subtitle}</CardTitle>
        </div>

        {showPopover ? (
          <Popover
            placement="bottom-start"
            triggerClassname={stylesIconButton.IconButton}
            options={popoverOptions}
          >
            <Icons.Icon name="VerticalDots" aria-label="more actions" />
          </Popover>
        ) : null}
      </CardHeader>
      <Separator />
    </>
  );
};

export default ChartHeader;
