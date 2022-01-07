import React, { useEffect } from 'react';
import { setGeoPos, SetGeoPositionPayload } from '../store/geopos'
import { connect } from 'react-redux';

interface GeoLocationServiceProps {
  setGeoPos: (payload: SetGeoPositionPayload) => void,
  geoLocationProps?: PositionOptions
};

function GeoLocationService({ setGeoPos, geoLocationProps }: GeoLocationServiceProps) {
  useEffect(() => {

    const handlePosChange = (pos: GeolocationPosition) => {
      setGeoPos({ geopos: pos })
    };
    const handlePosChangeError = (error: GeolocationPositionError) =>
      console.error(error);

    const watchId: number = navigator.geolocation.watchPosition(
      handlePosChange,
      handlePosChangeError,
      geoLocationProps
    );
  });

  return (<div></div>);
}

export default connect(
  null,
  (dispatch) => {
    return {
      setGeoPos: (payload: SetGeoPositionPayload) => dispatch(setGeoPos(payload))
    }
  }
)(GeoLocationService);