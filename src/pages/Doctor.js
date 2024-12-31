import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import DoctorCard from '@/components/DoctorCard';
import { Loader } from '@/components/Shared';

import { leafletContext } from '@/context';
import { useDoctors } from '@/context/doctorsContext';
import FooterInfoCard from '../components/Shared/FooterInfo';

import * as Styled from './styles/Doctor';

const Doctor = function Doctor() {
  const { doctors } = useDoctors();
  const { lng, type, name, instId } = useParams();
  const [doctor, setDoctor] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDoctor(doctors?.findByTypeAndNameSlug(type, name, instId));
  }, [doctors, doctor, lng, type, name, instId]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  if (doctor) {
    return (
      <Styled.Main id="main-content" component="main">
        <leafletContext.LeafletProvider>
          <DoctorCard doctor={doctor} isPage />
          <FooterInfoCard isDrPage />
        </leafletContext.LeafletProvider>
      </Styled.Main>
    );
  }
  if (loading) {
    return <Loader.Center component="main" />;
  }
  return <Navigate to={`/${lng}/404`} />;
};

export default Doctor;
