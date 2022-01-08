import {  useEffect } from 'react';
import {
  GeoPositionState,
  setGeoPos,
  SetGeoPositionPayload
} from '../store/geopos';
import { connect } from 'react-redux';
import { State } from '../store/state';

interface GeoLocationServiceProps {
  currentGeoPos: GeoPositionState;
  setGeoPos: (payload: SetGeoPositionPayload) => void;
  geoLocationProps?: PositionOptions;
}

function GeoLocationService({
  currentGeoPos,
  setGeoPos,
  geoLocationProps
}: GeoLocationServiceProps) {
  useEffect(() => {
    const handlePosChange = (pos: GeolocationPosition) => {
      setGeoPos({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        altitude: pos.coords.altitude ?? undefined
      });
    };
    const handlePosChangeError = (error: GeolocationPositionError) =>
      console.error(error);

    setTimeout(
      () =>
        navigator.geolocation.getCurrentPosition(
          handlePosChange,
          handlePosChangeError
        ),
      2000
    );
  }, [currentGeoPos, geoLocationProps, setGeoPos]);

  return null;
}

export default connect(
  (state: State) => {
    return {
      currentGeoPos: state.geopos
    };
  },
  dispatch => {
    return {
      setGeoPos: (payload: SetGeoPositionPayload) =>
        dispatch(setGeoPos(payload))
    };
  }
)(GeoLocationService);
