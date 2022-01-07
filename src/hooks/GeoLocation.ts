import { useEffect, useState } from 'react';

interface GeoLocationProps {
    geoLocationProps?: PositionOptions
  }

function useGeoLocation(
    { geoLocationProps }: GeoLocationProps
): GeolocationPosition | null {
  const [geoPos, setGeoPos] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    const handlePosChange = (pos: GeolocationPosition) => {
        return setGeoPos(pos);
    };
    const handlePosChangeError = (error: GeolocationPositionError) =>
      console.error(error);

    const watchId: number = navigator.geolocation.watchPosition(
      handlePosChange,
      handlePosChangeError,
      geoLocationProps
    );

    return () => navigator.geolocation.clearWatch(watchId);
  });

  return geoPos;
}

export default useGeoLocation;
