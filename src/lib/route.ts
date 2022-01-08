import { TripsLayerProps } from '@deck.gl/geo-layers/trips-layer/trips-layer';
import { TripsLayer } from 'deck.gl';

import bbox from '@turf/bbox';
import { lineString } from '@turf/helpers';

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
  const totalDuration =
    new Date(routeData.end_timestamp).getTime() -
    new Date(routeData.start_timestamp).getTime();
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
      trailLength: 430000, 
      widthMinPixels: 2.0,
      getPath: routeGetPath,
      getTimestamps: routeGetTimestamps,
      currentTime: animationTime
    });

export const routeToBbox = (route: RouteData['route']): number[] => {
  const routeLineString = lineString(route);
  const routeBbox = bbox(routeLineString);

  return routeBbox;
};

export const routesToBbox = (routes: RouteData['route'][]): number[] => {
  // Combine all routes into one big route
  const combinedRoute = routes.reduce((prev, curr) => prev.concat(curr), []);
  return routeToBbox(combinedRoute);
};
