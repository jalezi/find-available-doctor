import { useNavigate } from 'react-router-dom';
import { CardContent, Typography, Tooltip, IconButton, Stack } from '@mui/material';

import Accepts from './Accepts';
import * as Icons from 'components/Shared/Icons';
import SingleChart from 'components/Shared/CircleChart';
import * as Styled from './styles';
import * as Shared from './Shared';

import { DoctorTypeTranslate } from './dicts';
import { toPercent } from './utils';

const Info = ({ doctor, handleZoom = () => {} }) => {
  const lng = localStorage.getItem('i18nextLng') || 'sl';
  const accepts = doctor.accepts === 'y';
  const availabilityText = toPercent(doctor.availability, lng);

  const navigate = useNavigate();
  const handleDoctorCard = type => {
    const drPath = DoctorTypeTranslate?.[type];
    if (drPath) {
      const path = `/${lng}/${drPath}/${doctor?.name?.toLowerCase().replaceAll(' ', '-')}`;
      // todo pass filters' state as second argument
      return navigate(path);
    }
    console.error('No path!');
  };

  return (
    <CardContent>
      <Typography component="h2" variant="h2">
        {doctor.name}
      </Typography>
      <Shared.ConditionalLink to={doctor.website} component="h3" variant="h3">
        {doctor.provider}
      </Shared.ConditionalLink>
      <Typography component="address" variant="body2">
        {doctor.fullAddress}
      </Typography>

      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title={<Shared.Tooltip.HeadQuotient load={doctor.load} />}>
            <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
              <Accepts accepts={accepts.toString()} />
            </Styled.InfoWrapper>
          </Tooltip>
          <Tooltip title={<Shared.Tooltip.Availability />}>
            <Styled.InfoWrapper direction="row" alignItems="center" spacing={1}>
              <SingleChart size="26px" percent={doctor.availability} />
              <Stack>
                <Styled.Availability variant="caption">{availabilityText}</Styled.Availability>
              </Stack>
            </Styled.InfoWrapper>
          </Tooltip>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          {doctor.phone && (
            <Tooltip title={doctor.phone}>
              <IconButton>
                <Shared.Link href={`tel:${doctor.phone}`}>
                  <Icons.Icon name="Phone" />
                </Shared.Link>
              </IconButton>
            </Tooltip>
          )}
          <IconButton onClick={handleZoom}>
            <Icons.Icon name="MapMarker" />
          </IconButton>
          <IconButton onClick={() => handleDoctorCard(doctor.type)}>
            <Icons.Icon name="IdCard" />
          </IconButton>
        </Stack>
      </Stack>
    </CardContent>
  );
};

// todo try React.memo; don't forget about locales
export default Info;
