import { MapLoadEvent } from 'react-map-gl';

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