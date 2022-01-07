import { TripsLayerProps } from '@deck.gl/geo-layers/trips-layer/trips-layer';
import { TripsLayer } from 'deck.gl';

export interface RouteData {
  id: number;
  route: [number, number][];
  start_timestamp: number; // epoch time
  end_timestamp: number; // epoch time
  user_id: number;
  active_duration: number;
  distance: number;
  mean_speed: number;
  nike_id: string;
}

export const routeGetPath = (routeData: RouteData) => routeData.route;

export const routeGetTimestamps = (routeData: RouteData) => {
  const totalDuration = routeData.end_timestamp - routeData.start_timestamp;
  const interval = totalDuration / routeData.route.length;
  return routeData.route.map((_, idx) => interval * idx);
};

export const routesToTripsLayer =
  (
    animationTime: number = 0
  ): ((routeProp: TripsLayerProps<any>) => TripsLayer<any>) =>
  (routeProp: TripsLayerProps<any>) =>
    new TripsLayer({
      ...routeProp,
      getPath: routeGetPath,
      getTimestamps: routeGetTimestamps,
      currentTime: animationTime
    });
