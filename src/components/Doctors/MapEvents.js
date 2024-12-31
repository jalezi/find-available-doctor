import { useMapEvents } from 'react-leaflet';
import { useFilter } from '@/context/filterContext';
import { filterBySearchValueInMapBounds } from '../../utils';

const MapEvents = function MapEvents() {
  const { allDoctors, setDoctors, searchValue } = useFilter();

  const map = useMapEvents({
    moveend() {
      if (!allDoctors) return;

      const bounds = map.getBounds();
      const mapDoctors = filterBySearchValueInMapBounds({
        bounds,
        filtered: allDoctors,
        searchValue,
      });
      setDoctors(mapDoctors);
    },
  });
  return null;
};

export default MapEvents;
