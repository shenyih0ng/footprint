import Map from "../components/Map";
import SideMenu from "../components/SideMenu";
import { DEFAULT_BUILDING_OPTIONS, DEFAULT_GEOLOCATION_OPTIONS, DEFAULT_VIEW_STATE, MAP_ANIMATION_LENGTH, MAP_ANIMATION_SPEED, MAP_STYLE, TRIPS_LAYER_DEFAULT } from "../constants";

function MainPage() {
    return (<>
        <SideMenu />
        <Map
            tripsLayers={[TRIPS_LAYER_DEFAULT]}
            animationLoopLength={MAP_ANIMATION_LENGTH}
            animationSpeed={MAP_ANIMATION_SPEED}
            mapStyle={MAP_STYLE}
            buildingOptions={DEFAULT_BUILDING_OPTIONS}
            initialViewState={DEFAULT_VIEW_STATE}
            geoLocationOptions={DEFAULT_GEOLOCATION_OPTIONS} />
    </>);
}

export default MainPage;