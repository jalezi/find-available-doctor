const LATITUDE = 46.15890744507131;
const LONGITUDE = 14.979989970703146;

export const SL_CENTER = [LATITUDE, LONGITUDE];

// options for navigator.geolocation.getCurrentPosition(success, error, [options])
const MAX_AGE = 3_600_000; // default is 0
const TIMEOUT = Infinity; // default is Infinity
const ENABLE_HIGH_ACCURACY = false; // default is false

export const GET_CURRENT_POSITION_OPTIONS = {
  maxAge: MAX_AGE,
  timeout: TIMEOUT,
  enableHighAccuracy: ENABLE_HIGH_ACCURACY,
};
