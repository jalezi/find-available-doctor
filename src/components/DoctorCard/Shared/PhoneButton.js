import PropTypes from 'prop-types';
import { t } from 'i18next';

import { IconButton, Tooltip } from '@mui/material';

import * as Icons from '@/components/Shared/Icons';

const PhoneButton = function PhoneButton({ phone }) {
  const title = phone || t('doctorCard.noPhone');
  const iconName = phone ? 'PhoneBig' : 'NoPhoneBig';

  // Tooltip needs to listen to the child element's events to display the title. Add a simple wrapper element, such as a `span`.
  return (
    <Tooltip title={title} role="button">
      <span>
        <IconButton
          href={phone ? `tel:${phone}` : undefined}
          disabled={phone ? undefined : true}
          aria-label={title}
        >
          <Icons.Icon name={iconName} />
        </IconButton>
      </span>
    </Tooltip>
  );
};

PhoneButton.defaultProps = {
  phone: '',
};

PhoneButton.propTypes = {
  phone: PropTypes.string,
};

export default PhoneButton;
