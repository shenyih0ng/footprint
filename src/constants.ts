import { FlyToInterpolator, RGBAColor } from 'deck.gl';
import { BuildingOptions } from './utils';

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

export const TRANS_INTERPOLATOR = new FlyToInterpolator();

export const DEFAULT_GEOLOCATION_OPTIONS: PositionOptions = {
  maximumAge: 0,
  enableHighAccuracy: true
};
