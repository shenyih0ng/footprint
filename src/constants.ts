import { FlyToInterpolator, RGBAColor } from 'deck.gl';
import { BuildingOptions } from './utils';
import { ScatterplotLayerProps } from '@deck.gl/layers/scatterplot-layer/scatterplot-layer'

export const TITLE: string = "footprint"
export const DESCRIPTION: string = "find out how much of the world you've seen"

export const DUMMY_COVERAGE: number = 12.78;

export const DEFAULT_MAP_STYLE: string = 'mapbox://styles/mapbox/navigation-night-v1';
export const MAP_ZOOM: number = 16;
export const MAP_PIN_POINT_ZOOM: number = 18;
export const MAP_TRANSITION_DURATION: number = 3000;
export const MAP_ANIMATION_LENGTH: number = Infinity;
export const MAP_ANIMATION_SPEED: number = 321;

export const DEFAULT_BUILDING_OPTIONS: BuildingOptions = {
  color: '#fff',
  heightMultiplier: 1.5
};

export const DEFAULT_TRAIL_OPTIONS: {color: RGBAColor, opacity: number }= {
  color: [234, 63, 63],
  opacity: 0.6
}

// Geographical Data
// export const SG_LATLNG_CENTER: [number, number] = [1.3521, 103.8198];1.306200, 103.772581
export const SG_LATLNG_CENTER: [number, number] = [1.306200, 103.772581];

// Easing functions
export const TRANS_EASE_IN_CUBIC = (x: number): number => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export const TRANS_INTERPOLATOR = new FlyToInterpolator();

export const DEFAULT_GEOLOCATION_OPTIONS: PositionOptions = {
  maximumAge: 0,
  timeout: 500,
  enableHighAccuracy: true
};

// Layers

export const WALK_LAYER_DEFAULT: ScatterplotLayerProps<any> = {
  radiusScale: 0.2,
  lineWidthScale: 0, 
  stroked: false,
  filled: true,
  radiusMinPixels: 1,
  radiusMaxPixels: 100,
  lineWidthMinPixels: 1,
  opacity: 0.6,
}
