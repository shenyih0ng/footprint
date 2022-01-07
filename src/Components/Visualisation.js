import React, { useState, useEffect } from "react";
import DeckGL from "@deck.gl/react";
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import { TripsLayer } from '@deck.gl/geo-layers'
import { StaticMap } from "react-map-gl";

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.39079879999997,
  latitude: 37.7664413,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

// Some nice lightings TODO:
const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [-74.05, 40.7, 8000]
});

const lightingEffect = new LightingEffect({ambientLight, pointLight});

const DEFAULT_THEME = {
  buildingColor: [74, 80, 87],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  effects: [lightingEffect]
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

const Visualisation = ({
  map_style = MAP_STYLE,
  theme = DEFAULT_THEME,
  loopLength = 1800,
  animationSpeed = 1
}) => {
  const [time, setTime] = useState(0);
  const [animation] = useState({});

  const animate = () => {
    setTime(t => (t + animationSpeed) % loopLength);
    animation.id = window.requestAnimationFrame(animate);
  };

  useEffect(
    () => {
      animation.id = window.requestAnimationFrame(animate);
      return () => window.cancelAnimationFrame(animation.id);
    },
    [animation]
  );

	const layers = [
		new TripsLayer({
      id: 'trips-layer',
      data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf.trips.json',
      currentTime: 500,
      getTimestamps: d => d.waypoints.map(p => p.timestamp - 1554772579000),
      getPath: d => d.waypoints.map(p => p.coordinates),
      currentTime: time,
      trailLength: 600,
      capRounded: true,
      getColor: [20, 157, 255],
      jointRounded: true,
      widthMinPixels: 8,
      opacity: 1,
    })
	];

	return (
		<DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      effects={theme.effects}
      layers={layers} 
		>
      <StaticMap mapStyle={MAP_STYLE} mapboxApiAccessToken="pk.eyJ1IjoianVueWkwMCIsImEiOiJja3kzdXFiZjAwNXM5MnhvNHA1eXFpMTczIn0.Ni9VyNIxj-IeloVFGddO_w"/>
    </DeckGL>
	);
}

export default Visualisation