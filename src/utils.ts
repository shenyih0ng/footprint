import { MapLoadEvent } from 'react-map-gl';
import { ScatterplotLayer, ScatterplotLayerProps } from '@deck.gl/layers';
import { WALK_LAYER_DEFAULT } from './constants';
import { GeoPositionState } from './store/geopos';
import { useEffect, useState } from 'react';

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
    minzoom: 1,
    paint: {
      'fill-extrusion-color': buildingOptions.color,
      'fill-extrusion-opacity': 0.3,
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
      ]
    }
  });
}

export function createLiveWalkLayer(
  layerProps: Partial<ScatterplotLayerProps<any>>,
  walkData: { coordinates: [number, number] }[]
) {
  return new ScatterplotLayer({
    ...WALK_LAYER_DEFAULT,
    ...layerProps,
    data: walkData,
    getPosition: (d: any) => d.coordinates,
    getRadius: (d: any) => 10,
    getFillColor: (d: any) => [20, 183, 230],
    getLineCOlor: (d: any) => [255, 255, 255]
  });
}
