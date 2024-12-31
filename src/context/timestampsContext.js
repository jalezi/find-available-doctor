import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetchTs from '@/hooks/useFetchTs';
import { CSV_URL } from '@/const';

const TimestampsContext = createContext();

export const TimestampsConsumer = TimestampsContext.Consumer;

const TimestampsProvider = function TimestampsProvider({ children }) {
  const [drTs, setDrTs] = useState(null);

  const drTsRequest = useFetchTs(CSV_URL.DOCTORS_TS);

  useEffect(() => {
    if (!drTsRequest.isFetching && !drTsRequest.error) {
      setDrTs(drTsRequest.ts * 1000);
    }
  }, [drTsRequest.error, drTsRequest.isFetching, drTsRequest.ts]);

  const timestamps = useMemo(
    () => ({
      drTs,
    }),
    [drTs],
  );

  return <TimestampsContext.Provider value={timestamps}>{children}</TimestampsContext.Provider>;
};

TimestampsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

function useTimestamps() {
  const context = useContext(TimestampsContext);
  if (!context) {
    throw new Error(`useTimestamps must be used within a DoctorsProvider`);
  }
  return context;
}

export { TimestampsProvider, useTimestamps };
