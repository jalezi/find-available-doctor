import { memo } from 'react';
import { CardContent, Stack, Typography, Tooltip, IconButton, Link } from '@mui/material';
import Accepts from './Accepts';
import * as Icons from 'components/Shared/Icons';
import * as Styled from './styles';
import SingleChart from 'components/Shared/CircleChart';
import { t } from 'i18next';

const DoctorCard = ({ doctor, handleRoomIconClick = () => { } }) => {
  const accepts = doctor.accepts === 'y';

  const availabilityText = new Intl.NumberFormat('sl-SL', {
    style: 'percent',
  }).format(doctor.availability);

  const tooltip = (
    <Stack sx={{ textAlign: 'center' }}>
      <Typography variant="caption">{t('glavarinskiKolicnik')}</Typography>
      <Typography variant="body2">{parseFloat(doctor.load)}</Typography>
    </Stack>
  );

  const ConditionalLink = ({ children, to, condition }) => (!!condition && to)
      ? <Styled.SubTitle><Link rel="noopener noreferrer" target="_blank" href={to}>{children}</Link></Styled.SubTitle>
      : <Styled.SubTitle>{children}</Styled.SubTitle>;

  return (
    <Styled.Card id={doctor.id} accepts={accepts.toString()}>
      <CardContent>
        <Styled.DataWrapper>
          <Styled.MainInfo sx={{ marginRight: 'auto' }}>
            <Styled.Title component="h2">{doctor.name}</Styled.Title>
            <ConditionalLink to={doctor.website} condition={doctor.website !== ""}>
              {doctor.provider}
            </ConditionalLink>
            <Styled.Text>{doctor.fullAddress}</Styled.Text>
          </Styled.MainInfo>
          {/* <Divider orientation="horizontal" flexItem /> */}
          <Styled.OtherInfo>
            <Styled.OtherInfoElement>
              <Accepts accepts={accepts.toString()} />
              <Tooltip title={tooltip}>
                <Styled.AvailabilityInfo>
                  <SingleChart size="26px" percent={doctor.availability} />
                  <Styled.Availability variant="caption">{availabilityText}</Styled.Availability>
                </Styled.AvailabilityInfo>
              </Tooltip>
            </Styled.OtherInfoElement>
            <Styled.OtherInfoElement>
              <IconButton onClick={() => console.log('Click room icon')}>
                <Icons.Icon name="MapMarker" />
              </IconButton>
              <IconButton onClick={() => console.log('Click room icon')}>
                <Icons.Icon name="IdCard" />
              </IconButton>
            </Styled.OtherInfoElement>
          </Styled.OtherInfo>
        </Styled.DataWrapper>
      </CardContent>
    </Styled.Card >
  );
};

const propsAreEqual = (prevProps, nextProps) => {
  return prevProps.doctor.id === nextProps.doctor.id;
};
export default memo(DoctorCard, propsAreEqual);
