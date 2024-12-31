import { memo } from 'react';
import PropTypes from 'prop-types';
import { CardContent, CardMedia } from '@mui/material';

import { useLeafletContext } from '@/context/leafletContext';
import DoctorMap from './Map';
import * as Styled from './styles';
import Info from './Info';
import PageInfo from './PageInfo';
import { withErrorBoundary } from '../Shared/ErrorBoundary';
import { DoctorPropType } from '../../types';

const DoctorCard = function DoctorCard({ doctor, isPage = false, handleRoomIconClick }) {
  const accepts = doctor.accepts === 'y';
  const { map, setMap } = useLeafletContext();

  const handleZoom = () => {
    const { lat, lon } = doctor.geoLocation;
    map.flyTo([lat, lon], 13);
  };

  const id = `${doctor.type}#${doctor.nameSlug}`;

  if (isPage) {
    return (
      <Styled.PageInfoCard id={id} accepts={accepts.toString()}>
        <Styled.PageInfoBox id="doctor-box">
          <PageInfo doctor={doctor} handleZoom={handleZoom} />
          <CardContent>
            <CardMedia component="div">
              <DoctorMap doctor={doctor} whenCreated={setMap} handleRoomIconClick={handleZoom} />
            </CardMedia>
          </CardContent>
        </Styled.PageInfoBox>
      </Styled.PageInfoCard>
    );
  }

  return (
    <Styled.InfoCard id={id} accepts={accepts.toString()}>
      <Info doctor={doctor} handleZoom={handleRoomIconClick} />
    </Styled.InfoCard>
  );
};

DoctorCard.propTypes = {
  doctor: DoctorPropType.isRequired,
  isPage: PropTypes.bool,
  handleRoomIconClick: PropTypes.func,
};

DoctorCard.defaultProps = {
  isPage: false,
  handleRoomIconClick: undefined,
};

const propsAreEqual = (prevProps, nextProps) => prevProps.doctor.key === nextProps.doctor.key;
export default memo(withErrorBoundary(DoctorCard), propsAreEqual);
