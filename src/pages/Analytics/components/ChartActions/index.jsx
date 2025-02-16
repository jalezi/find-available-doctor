import { Icon } from 'components/Shared/Icons';
import { getIsRequestFullscreenSupported } from 'utils';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import styles from '../../Cards/Cards.module.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const ChartActions = function ChartActions({ actions }) {
  const isRequestFullscreenSupported = getIsRequestFullscreenSupported(document.documentElement);

  const tCommonButtons = t('analytics.common.buttons', { returnObjects: true });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label="Options" className={styles.IconButton}>
          <Icon name="VerticalDots" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{tCommonButtons.menu}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isRequestFullscreenSupported ? (
          <DropdownMenuItem asChild>
            <button type="button" onClick={actions.openFullScreen} style={{ width: '100%' }}>
              {tCommonButtons.fullScreen}
            </button>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem asChild>
          <button type="button" onClick={actions.printChart} style={{ width: '100%' }}>
            {tCommonButtons.print}
          </button>
        </DropdownMenuItem>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{tCommonButtons.export}</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <button type="button" onClick={actions.handleCsvDownload} style={{ width: '100%' }}>
              CSV
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button type="button" onClick={actions.handleJsonDownload} style={{ width: '100%' }}>
              JSON
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
ChartActions.propTypes = {
  actions: PropTypes.shape({
    openFullScreen: PropTypes.func.isRequired,
    printChart: PropTypes.func.isRequired,
    handleCsvDownload: PropTypes.func.isRequired,
    handleJsonDownload: PropTypes.func.isRequired,
  }).isRequired,
  translations: PropTypes.shape({
    menu: PropTypes.string.isRequired,
    export: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChartActions;
