import DeckGL, { FlyToInterpolator } from "deck.gl";
import { ViewStateProps } from "@deck.gl/core/lib/deck";
import { StaticMap, NavigationControl, _MapContext as MapContext } from "react-map-gl";
import { MAP_STYLE, MAP_TRANSITION_DURATION, MAP_ZOOM, SG_LATLNG_CENTER, TRANS_EASE_IN_CUBIC } from "../constants";
import useViewState from "../hooks/ViewState";

const DEFAULT_VIEW_STATE: ViewStateProps = {
    latitude: SG_LATLNG_CENTER[0],
    longitude: SG_LATLNG_CENTER[1],
    zoom: MAP_ZOOM,
    // transition settings
    transitionDuration: MAP_TRANSITION_DURATION,
    transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: TRANS_EASE_IN_CUBIC
}

const DEFAULT_GEOLOCATION_OPTIONS: PositionOptions = {
    maximumAge: Infinity,
    enableHighAccuracy: true
}

function Map() {
    const viewState = useViewState({ viewProps: DEFAULT_VIEW_STATE, geoLocationProps: DEFAULT_GEOLOCATION_OPTIONS })
    return (
        <DeckGL
            ContextProvider={MapContext.Provider}
            initialViewState={viewState}
            controller={true}
        >
            <NavigationControl className="absolute top-2 right-2" />
            <StaticMap
                attributionControl={false}
                mapStyle={MAP_STYLE}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN} />
        </DeckGL >
    )
}

export default Map;