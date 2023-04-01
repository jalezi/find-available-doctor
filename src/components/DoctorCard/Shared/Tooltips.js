import PropTypes from 'prop-types';

import { t } from 'i18next';

import { styled } from '@mui/material/styles';
import { Divider, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { toPercent } from '../utils';

export const HeadQuotient = function HeadQuotient({ load, note, date, hasOverride }) {
  return (
    <Stack sx={{ textAlign: 'center' }}>
      <Typography variant="caption">{t('headQuotient')}</Typography>
      <Typography variant="body2">{parseFloat(load)}</Typography>
      {hasOverride && (
        <>
          <TooltipDivider />
          <Stack sx={{ textAlign: 'start' }}>
            {note && <Typography variant="caption">{note}</Typography>}
            {date && (
              <Typography variant="caption">
                {t('changedOn')} {date}
              </Typography>
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
};

HeadQuotient.defaultProps = {
  hasOverride: undefined,
};

HeadQuotient.propTypes = {
  load: PropTypes.string.isRequired,
  note: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(undefined)]).isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(undefined)]).isRequired,
  hasOverride: PropTypes.bool,
};

export const Availability = function Availability({ date, hasOverride, availability }) {
  const { lng } = useParams();
  const availabilityText = toPercent(availability, lng);

  return (
    <Stack>
      <Typography variant="caption" fontWeight="700">
        {t('doctorAvailabilityLabel')}: {availabilityText}
      </Typography>
      <Typography variant="caption">{t('doctorAvailability')}</Typography>
      {hasOverride && (
        <>
          <TooltipDivider />
          <Typography variant="caption">
            {t('changedOn')} {date}
          </Typography>
        </>
      )}
    </Stack>
  );
};

Availability.propTypes = {
  date: PropTypes.string,
  hasOverride: PropTypes.bool,
  availability: PropTypes.number,
};

Availability.defaultProps = {
  date: undefined,
  hasOverride: undefined,
  availability: undefined,
};

export const Updated = function Updated({
  date,
  acceptsOverride,
  availabilityOverride,
  acceptsZZZS,
  availabilityZZZS,
  note,
}) {
  const { lng } = useParams();

  const acceptsOverrideText = acceptsOverride === 'y' ? t('accepts') : t('rejects');
  const acceptsZZZSText = acceptsZZZS === 'y' ? t('accepts') : t('rejects');

  const availabilityZZZSText = toPercent(availabilityZZZS, lng);
  const availabilityOverrideText = toPercent(availabilityOverride, lng);

  return (
    <Stack sx={{ textAlign: 'left' }}>
      <Typography variant="caption">
        {t('changedOn')}
        {date}
      </Typography>
      <TooltipDivider />
      {note && <Typography variant="caption">{note}</Typography>}
      {availabilityOverride && (
        <Typography variant="caption">
          {t('doctorAvailabilityLabel')}: {availabilityZZZSText} → {availabilityOverrideText}
        </Typography>
      )}
      {acceptsOverride && (
        <Typography variant="caption">
          {acceptsZZZSText} → {acceptsOverrideText}
        </Typography>
      )}
    </Stack>
  );
};

export const TooltipDivider = styled(Divider)(() => ({
  borderColor: 'rgba(255,255,255,0.5)',
  margin: '5px 0',
}));

Updated.propTypes = {
  note: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  acceptsZZZS: PropTypes.oneOf(['y', 'n']).isRequired,
  availabilityZZZS: PropTypes.string.isRequired,
  acceptsOverride: PropTypes.oneOf(['y', 'n', '']).isRequired,
  availabilityOverride: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(undefined)])
    .isRequired,
};
