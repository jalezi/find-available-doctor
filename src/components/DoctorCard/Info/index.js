import { CardContent, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { t } from 'i18next';

import { useLeafletContext } from '@/context/leafletContext';

import PropTypes from 'prop-types';
import DoctorActions from './DoctorActions';

import { DoctorPropType } from '../../../types';
import * as Shared from '../Shared';

const Info = function Info({ doctor, handleZoom = () => {}, isMarker = false }) {
  const { lng } = useParams();
  const { map } = useLeafletContext();
  const [type, ageGroup] = doctor.type.split('-');

  const navigate = useNavigate();
  const viewType = isMarker ? 'marker' : 'list';
  const drPath = doctor?.type;
  const slug = doctor?.nameSlug;
  const instId = doctor?.instId;

  const path = `/${lng}/${drPath}/${slug}/${instId}`;

  const handleDoctorCard = (event, isReportError) => {
    // Cmd + Click should open in new tab
    if (event.metaKey) {
      return;
    }

    event.preventDefault();
    const center = map?.getCenter();

    navigate(path, {
      state: {
        zoom: map?.getZoom(),
        center: center ? [center.lat, center.lng] : undefined,
        isReportError,
        type,
        ageGroup: ageGroup ?? 'adults',
      },
    });
  };

  const phoneNum = doctor.phone?.split(',')?.[0];
  const formatedLoad =
    doctor.type.startsWith('gyn') || doctor.type.startsWith('den')
      ? Intl.NumberFormat(lng, {
          style: 'percent',
          maximumFractionDigits: 2,
        }).format(doctor.load / 100)
      : Intl.NumberFormat(lng).format(doctor.load);

  const headQuotientTooltipTItle =
    doctor.type.startsWith('gyn') || doctor.type.startsWith('den')
      ? t('achievingAverageOE')
      : t('headQuotient');

  return (
    <>
      <CardContent>
        <Stack
          direction={isMarker ? 'column' : 'row'}
          alignItems={isMarker ? 'flex-start' : 'center'}
        >
          <Typography component="h2" variant="h2" translate="no">
            <Shared.LinkNoRel href={path} onClick={e => handleDoctorCard(e, false)}>
              {doctor.name}
            </Shared.LinkNoRel>
          </Typography>
          <Shared.DoubleChip
            type={type}
            ageGroup={ageGroup}
            isExtra={doctor.isExtra}
            isFloating={doctor.isFloating}
            viewType={viewType}
          />
        </Stack>
        <Typography component="h3" variant="h3" translate="no">
          {doctor.provider}
        </Typography>
        <Typography component="address" variant="body2" translate="no">
          {doctor.fullAddress}
        </Typography>
        <Stack direction={isMarker ? 'column' : 'row'} justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Shared.HeadQuotient
              load={formatedLoad}
              note={doctor.note}
              date={doctor.updatedAt && doctor.formatUpdatedAt(lng)}
              accepts={doctor.accepts}
              hasOverride={doctor.acceptsOverride || doctor.note ? true : undefined}
              tooltipTitle={headQuotientTooltipTItle}
            />
            <Shared.Availability
              isFloating={doctor.isFloating}
              availability={doctor.availability}
              date={doctor.updatedAt && doctor.formatUpdatedAt(lng)}
              hasOverride={doctor.availabilityOverride ? true : undefined}
            />
          </Stack>
        </Stack>
      </CardContent>
      <DoctorActions
        menuId={`dr-menu--${drPath}-${slug}`}
        isMarker={isMarker}
        handlers={{ handleZoom, handleDoctorCard }}
        phoneNum={phoneNum}
        path={path}
      />
    </>
  );
};

Info.propTypes = {
  doctor: DoctorPropType,
  handleZoom: PropTypes.func,
  isMarker: PropTypes.bool,
};

Info.defaultProps = {
  doctor: undefined,
  handleZoom: undefined,
  isMarker: false,
};

// todo try React.memo; don't forget about locales
export default Info;
