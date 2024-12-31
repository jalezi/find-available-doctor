import PropTypes from 'prop-types';
import ToggleGroup from '@/components/Shared/ToggleGroup';

import { t } from 'i18next';
import { IconToggleButton } from './Shared';

function withToggleGroup(Component) {
  const ToggleMapCards = function ToggleMapCards({ useShow }) {
    const [show, setShow] = useShow();

    return (
      <Component value={show} setValue={setShow}>
        <IconToggleButton
          value="map"
          aria-label="map"
          accept={show}
          title={t('map')}
          iconNames={['MapViewWhite', 'MapView']}
        />
        <IconToggleButton
          value="cards"
          aria-label="doctor cards"
          accept={show}
          title={t('list')}
          iconNames={['ListViewWhite', 'ListView']}
        />
      </Component>
    );
  };

  ToggleMapCards.propTypes = {
    useShow: PropTypes.func.isRequired,
  };

  return ToggleMapCards;
}

export default withToggleGroup(ToggleGroup);
