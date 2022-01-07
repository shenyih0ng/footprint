import DeckGL from "deck.gl";
import { useState } from "react";
import { ViewStateProps } from '@deck.gl/core/lib/deck';
import { TripsLayerProps } from '@deck.gl/geo-layers/trips-layer/trips-layer'
import { StaticMap, NavigationControl, _MapContext as MapContext, MapLoadEvent } from "react-map-gl";
import useViewState from "../hooks/ViewState";
import { addBuildingExtrusion, BuildingOptions, createTripsLayer } from "../utils";
import useAnimationFrame from "../hooks/AnimationFrame";

interface MapProps {
    tripsLayers: TripsLayerProps<any>[],
    initialViewState: ViewStateProps,
    buildingOptions: BuildingOptions,
    geoLocationOptions: PositionOptions,
    mapStyle: string,
    animationLoopLength: number,
    animationSpeed: number
}

function Map({ tripsLayers, initialViewState, buildingOptions, geoLocationOptions, mapStyle, animationLoopLength, animationSpeed }: MapProps) {
    // Animation
    const animationTime: number = useAnimationFrame({ animationLoopLength, animationSpeed })
    const [tLayers] = useState(tripsLayers);
    const viewState = useViewState({ viewProps: initialViewState, geoLocationProps: geoLocationOptions })

    const mapOnload = (event: MapLoadEvent): void => {
        addBuildingExtrusion(event, buildingOptions)
    }

    return (
        <DeckGL
            ContextProvider={MapContext.Provider}
            initialViewState={viewState}
            controller={true}
            layers={
                tLayers.map(props => createTripsLayer({
                    ...props,
                    currentTime: animationTime
                }))
            }
        >
            <NavigationControl className="absolute top-2 right-2" />
            {/* Add live user marker */}
            <StaticMap
                onLoad={mapOnload}
                attributionControl={false}
                mapStyle={mapStyle}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN} />
        </DeckGL >
    );
}

export default Map;