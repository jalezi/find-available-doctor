import { useEffect, useState, createRef, memo } from 'react';
import { useMap } from 'react-leaflet';
import { useTheme } from '@mui/material/styles';

import { Markers } from '@/components/Shared/Leaflet';
import { t } from 'i18next';
import * as Styled from './styles';
import Info from '../DoctorCard/Info';
import { DoctorPropType } from '../../types';

export const User = function User() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on('locationfound', e => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  return position && <Markers.LeafletMarker position={position} tooltip={t('yourLocation')} />;
};

const PopUpData = function PopUpData({ doctor }) {
  return (
    <Styled.InfoCard>
      <Info doctor={doctor} isMarker />
    </Styled.InfoCard>
  );
};

PopUpData.propTypes = {
  doctor: DoctorPropType.isRequired,
};

const areEqual = (prevProps, nextProps) => prevProps.doctor.key === nextProps.doctor.key;
export const Doctor = memo(({ doctor }) => {
  const ref = createRef(null);
  const theme = useTheme();
  const { palette } = theme;
  let fillColor = doctor.accepts === 'y' ? palette.success.main : palette.error.main;
  if (doctor.type === 'gp-f' && doctor.accepts === 'y') {
    fillColor = theme.customColors.mediumBlue;
  }
  return (
    <Markers.LeafletCircleMarker
      ref={ref}
      center={doctor.geoLocation}
      radius={12}
      accepts={doctor.accepts}
      stroke={false}
      fillOpacity={0.7}
      fillColor={fillColor}
      popup={<PopUpData doctor={doctor} popUpRef={ref} />}
    />
  );
}, areEqual);

Doctor.propTypes = {
  doctor: DoctorPropType.isRequired,
};
