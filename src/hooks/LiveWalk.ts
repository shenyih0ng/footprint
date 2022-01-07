import { useEffect, useState } from 'react';
import { LIVE_WALK_DATA_INTERFACE } from '../constants';

interface LiveWalkProps {
  geoPosition: GeolocationPosition | null
}

function useLiveWalk(
  { geoPosition }: LiveWalkProps
): LIVE_WALK_DATA_INTERFACE[] {
  const [liveWalkPoints, setLiveWalkPoints] = useState<LIVE_WALK_DATA_INTERFACE[]>([]);

  useEffect(() => {
    if (geoPosition == null) return;
    setLiveWalkPoints([
        ...liveWalkPoints,
        { coordinates: [geoPosition.coords.longitude, geoPosition.coords.latitude] }
    ]);
  }, [geoPosition]);

  return liveWalkPoints;
}

export default useLiveWalk;
