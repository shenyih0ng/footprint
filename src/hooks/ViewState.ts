import { useEffect, useState } from 'react';
import { InitialViewStateProps } from "@deck.gl/core/lib/deck";
import { MAP_PIN_POINT_ZOOM } from '../constants';

interface ViewStateProps {
  viewProps: InitialViewStateProps,
  geoPosition: GeolocationPosition | null
}

function useViewState(
  {viewProps, geoPosition}: ViewStateProps
): InitialViewStateProps {
  const [viewState, setViewState ] = useState<InitialViewStateProps>(viewProps);

  useEffect(() => {
    if (geoPosition == null) return;
    setViewState({
      ...viewState,
      latitude: geoPosition.coords.latitude,
      longitude: geoPosition.coords.longitude,
      zoom: MAP_PIN_POINT_ZOOM
    });
  }, [geoPosition]);

  return viewState;
}

export default useViewState;
