import { MapLoadEvent } from 'react-map-gl';
import { TripsLayerProps } from '@deck.gl/geo-layers/trips-layer/trips-layer'
import { TripsLayer } from 'deck.gl';
import { TRIPS_LAYER_DEFAULT } from './constants';

export interface BuildingOptions {
  color: string;
  heightMultiplier: number;
}

export function addBuildingExtrusion(
  mapLoadEvent: MapLoadEvent,
  buildingOptions: BuildingOptions
) {
  const map: mapboxgl.Map = mapLoadEvent.target;
  map.addLayer({
    id: '3d-buildings',
    source: 'composite',
    'source-layer': 'building',
    filter: ['==', 'extrude', 'true'],
    type: 'fill-extrusion',
    minzoom: 10,
    paint: {
      'fill-extrusion-color': buildingOptions.color,

      // use an 'interpolate' expression to add a smooth transition effect to the
      // buildings as the user zooms in
      'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        10,
        0,
        10.05,
        ['*', buildingOptions.heightMultiplier, ['get', 'height']]
      ],
      'fill-extrusion-base': [
        'interpolate',
        ['linear'],
        ['zoom'],
        10,
        0,
        10.05,
        ['*', buildingOptions.heightMultiplier, ['get', 'min_height']]
      ],
      'fill-extrusion-opacity': 0.2
    }
  });
}

export function createTripsLayer(layerProps: Partial<TripsLayerProps<any>>) {
    return new TripsLayer({
        ...TRIPS_LAYER_DEFAULT,
        ...layerProps
    })
}