import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CSV_URL, DOCTORS } from '@/const';
import { createDoctors } from '@/services';
import { fromArrayWithHeader } from '@/utils';
import useFetchAndParseCsv from '../hooks/useFetchAndParseCsv';
import { ChildrenPropType } from '../types';

const DoctorsContext = createContext({});

export const DoctorsConsumer = DoctorsContext.Consumer;

const DoctorsProvider = function DoctorsProvider({ children }) {
  const [doctors, setDoctors] = useState(null);
  const [dicts, setDicts] = useState({ doctors: null, institutions: null });

  const institutionsRequest = useFetchAndParseCsv(CSV_URL.INSTITUTIONS);
  const doctorsRequest = useFetchAndParseCsv(CSV_URL.DOCTORS);

  const isFetching = doctorsRequest.isFetching || institutionsRequest.isFetching;
  const errors = useMemo(
    () => [doctorsRequest.error, institutionsRequest.error],
    [doctorsRequest.error, institutionsRequest.error],
  );

  const doctorsFetched =
    (!!doctorsRequest.parsed || doctorsRequest.error) &&
    (!!institutionsRequest.parsed || institutionsRequest.error);

  useEffect(() => {
    if (doctorsFetched) {
      const doctorsDict = fromArrayWithHeader(doctorsRequest.parsed);
      const institutionsDict = fromArrayWithHeader(
        institutionsRequest.parsed,
        DOCTORS.INSTITUTION_KEY,
      );

      setDoctors(
        createDoctors({
          doctorsDict,
          institutionsDict,
        }),
      );
      setDicts({ doctors: doctorsDict, institutions: institutionsDict });
    }
  }, [doctorsRequest.parsed, institutionsRequest.parsed, doctorsFetched]);

  const value = useMemo(
    () => ({ isFetching, errors, doctors, dicts }),
    [dicts, doctors, errors, isFetching],
  );
  return <DoctorsContext.Provider value={value}>{children}</DoctorsContext.Provider>;
};

function useDoctors() {
  const context = useContext(DoctorsContext);
  if (!context) {
    throw new Error(`useDoctors must be used within a DoctorsProvider`);
  }
  return context;
}

DoctorsProvider.propTypes = {
  children: ChildrenPropType.isRequired,
};

export { DoctorsProvider, useDoctors };
