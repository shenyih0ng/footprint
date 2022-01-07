import { useEffect, useState } from 'react';
import { InitialViewStateProps } from "@deck.gl/core/lib/deck";
import { MAP_PIN_POINT_ZOOM } from '../constants';

interface ViewStateProps {
  viewProps: InitialViewStateProps,
  geoLocationProps?: PositionOptions
}

function useViewState(
  {viewProps, geoLocationProps}: ViewStateProps
): InitialViewStateProps {
  const [viewState, setViewState ] = useState<InitialViewStateProps>(viewProps);

  useEffect(() => {
    const handlePosChange = (pos: GeolocationPosition) => setViewState({
      ...viewState,
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      zoom: MAP_PIN_POINT_ZOOM
    });
    const handlePosChangeError = (error: GeolocationPositionError) =>
      console.error(error);

    const watchId: number = navigator.geolocation.watchPosition(
      handlePosChange,
      handlePosChangeError,
      geoLocationProps
    );

    return () => navigator.geolocation.clearWatch(watchId);
  });

  return viewState;
}

export default useViewState;
