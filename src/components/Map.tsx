import DeckGL from "deck.gl";
import { connect } from 'react-redux'
import { TripsLayerProps } from '@deck.gl/geo-layers/trips-layer/trips-layer'
import { StaticMap, NavigationControl, _MapContext as MapContext, MapLoadEvent } from "react-map-gl";
import { addBuildingExtrusion, BuildingOptions, createLiveWalkLayer } from "../utils";
import useAnimationFrame from "../hooks/AnimationFrame";
import { State } from "../store/state"
import { routesToTripsLayer } from "../lib/route";
import { flyToLocation, FlyToLocationPayload, ViewPortState } from "../store/viewport";
import { ViewStateProps } from '@deck.gl/core/lib/deck';
import { TRANS_EASE_IN_CUBIC, TRANS_INTERPOLATOR } from "../constants";
import { GeoPosition, GeoPositionState } from "../store/geopos";

interface MapProps {
    currentPosition: GeoPosition,
    liveWalkHistory: GeoPosition[],
    currentViewport: ViewPortState,
    routeLayers: TripsLayerProps<any>[],
    buildingOptions: BuildingOptions,
    mapStyle: string,
    animationLoopLength: number,
    animationSpeed: number,
    flyToLocation: (payload: FlyToLocationPayload) => void;
}

function Map({ currentPosition, liveWalkHistory, currentViewport, routeLayers, buildingOptions, mapStyle, animationLoopLength, animationSpeed }: MapProps) {
    // Animation
    const animationTime: number = useAnimationFrame({ animationLoopLength, animationSpeed })
    const handleMapLoad = (event: MapLoadEvent): void => {
        addBuildingExtrusion(event, buildingOptions)
    }

    const viewState: ViewStateProps = {
        ...currentViewport,
        transitionInterpolator: TRANS_INTERPOLATOR,
        transitionEasing: TRANS_EASE_IN_CUBIC
    }

    return (
        <DeckGL
            ContextProvider={MapContext.Provider}
            initialViewState={viewState}
            controller={true}
            layers={[...routeLayers.map(routesToTripsLayer(animationTime)),
            createLiveWalkLayer({}, liveWalkHistory.map((geoPos: GeoPosition) => {
                return { 'coordinates': [geoPos.longitude, geoPos.latitude] }
            }))]}
        >
            <NavigationControl className="absolute top-2 right-2" />
            {/* TODO Add live user marker */}
            <StaticMap
                onLoad={handleMapLoad}
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
            routeLayers: state.routes.layers,
            currentPosition: state.geopos.currentPosition,
            liveWalkHistory: state.geopos.history
        }
    },
    (dispatch) => {
        return {
            flyToLocation: (payload: FlyToLocationPayload) => dispatch(flyToLocation(payload))
        }
    }
)(Map);