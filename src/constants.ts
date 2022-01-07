import { FlyToInterpolator, RGBAColor } from 'deck.gl';
import { BuildingOptions } from './utils';
import { ViewStateProps } from '@deck.gl/core/lib/deck';
import { TripsLayerProps } from '@deck.gl/geo-layers/trips-layer/trips-layer'

export const MAP_STYLE: string = 'mapbox://styles/junyi00/cky44vojs0nn414nqy3x7tbr1';
export const MAP_ZOOM: number = 13;
export const MAP_PIN_POINT_ZOOM: number = 18;
export const MAP_TRANSITION_DURATION: number = 3000;
export const MAP_ANIMATION_LENGTH: number = 1800;
export const MAP_ANIMATION_SPEED: number = 3.0;

export const DEFAULT_BUILDING_OPTIONS: BuildingOptions = {
  color: '#aaa',
  heightMultiplier: 1.0
};

export const DEFAULT_TRAIL_OPTIONS: {color: RGBAColor, opacity: number }= {
  color: [253, 128, 93],
  opacity: 0.6
}

// Geographical Data
export const SG_LATLNG_CENTER: [number, number] = [1.3521, 103.8198];

// Easing functions
export const TRANS_EASE_IN_CUBIC = (x: number): number => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export const DEFAULT_VIEW_STATE: ViewStateProps = {
  latitude: SG_LATLNG_CENTER[0],
  longitude: SG_LATLNG_CENTER[1],
  zoom: MAP_ZOOM,
  // transition settings
  transitionDuration: MAP_TRANSITION_DURATION,
  transitionInterpolator: new FlyToInterpolator(),
  transitionEasing: TRANS_EASE_IN_CUBIC
};

export const DEFAULT_GEOLOCATION_OPTIONS: PositionOptions = {
  maximumAge: 0,
  enableHighAccuracy: true
};

// Layers

export const TRIPS_LAYER_DEFAULT: TripsLayerProps<any> = {
  id: 'trips-layer',
  // test data
  data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf.trips.json',
  getTimestamps: (d: any) => d.waypoints.map((p: any) => p.timestamp - 1554772579000),
  getPath: d => d.waypoints.map((p: any) => p.coordinates),
  trailLength: 400,
  capRounded: true,
  getColor: DEFAULT_TRAIL_OPTIONS.color,
  jointRounded: true,
  widthMinPixels: 8,
  opacity: DEFAULT_TRAIL_OPTIONS.opacity,
  currentTime: 100
}

