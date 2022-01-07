// Map Data
export const MAP_STYLE: string =
  'mapbox://styles/mapbox/navigation-night-v1';
export const MAP_ZOOM: number = 13;
export const MAP_PIN_POINT_ZOOM: number = 20;
export const MAP_TRANSITION_DURATION: number = 3000;

// Geographical Data
export const SG_LATLNG_CENTER: [number, number] = [1.3521, 103.8198];

// Easing functions
export const TRANS_EASE_IN_CUBIC = (x: number): number => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
