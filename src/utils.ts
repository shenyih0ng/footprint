import { ScatterplotLayer } from 'deck.gl';
import { MapLoadEvent } from 'react-map-gl';
import { LIVE_WALK_DATA_INTERFACE, WALK_LAYER_DEFAULT } from './constants';
import { ScatterplotLayerProps } from '@deck.gl/layers/scatterplot-layer/scatterplot-layer'

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

export function createLiveWalkLayer(layerProps: Partial<ScatterplotLayerProps<any>>, liveWalkPoints: LIVE_WALK_DATA_INTERFACE[]) {
  return new ScatterplotLayer({
    ...WALK_LAYER_DEFAULT,
    ...layerProps,
    data: liveWalkPoints,
    getPosition: (d: any) => d.coordinates,
    getRadius: (d: any) => 10,
    getFillColor: (d: any) => [20, 183, 230],
    getLineCOlor: (d: any) => [255, 255, 255]
  })
}