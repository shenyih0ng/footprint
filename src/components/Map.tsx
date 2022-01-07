import DeckGL from "deck.gl";
import { connect } from 'react-redux'
import { TripsLayerProps } from '@deck.gl/geo-layers/trips-layer/trips-layer'
import { StaticMap, NavigationControl, _MapContext as MapContext, MapLoadEvent } from "react-map-gl";
import { addBuildingExtrusion, BuildingOptions } from "../utils";
import useAnimationFrame from "../hooks/AnimationFrame";
import { State } from "../store/state"
import { routesToTripsLayer } from "../lib/route";
import { ViewPortState } from "../store/viewport";
import { ViewStateProps } from '@deck.gl/core/lib/deck';
import { TRANS_EASE_IN_CUBIC, TRANS_INTERPOLATOR } from "../constants";

interface MapProps {
    currentViewport: ViewPortState,
    routeLayers: TripsLayerProps<any>[],
    buildingOptions: BuildingOptions,
    geoLocationOptions: PositionOptions,
    mapStyle: string,
    animationLoopLength: number,
    animationSpeed: number
}

function Map({ currentViewport, routeLayers, buildingOptions, geoLocationOptions, mapStyle, animationLoopLength, animationSpeed }: MapProps) {
    // Animation
    const animationTime: number = useAnimationFrame({ animationLoopLength, animationSpeed })
    const mapOnload = (event: MapLoadEvent): void => {
        addBuildingExtrusion(event, buildingOptions)
    }
    
    const viewState: ViewStateProps  = {
        ...currentViewport,
        transitionInterpolator: TRANS_INTERPOLATOR,
        transitionEasing: TRANS_EASE_IN_CUBIC
    }

    return (
        <DeckGL
            ContextProvider={MapContext.Provider}
            initialViewState={viewState}
            controller={true}
            layers={ [...routeLayers.map(routesToTripsLayer(animationTime))]}
        >
            <NavigationControl className="absolute top-2 right-2" />
            {/* TODO Add live user marker */}
            <StaticMap
                onLoad={mapOnload}
                attributionControl={false}
                mapStyle={mapStyle}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN} />
        </DeckGL >
    );
}

export default connect(
    (state: State) => {
        return {
            currentViewport: state.viewport,
            routeLayers: state.routes.layers
        }
    },
)(Map);