import GeoLocationService from '../components/GeoLocationService';
import Coverage from "../components/Coverage";
import LayerController from "../components/LayerController";
import Map from "../components/Map";
import SideMenu from "../components/SideMenu";
import { DEFAULT_BUILDING_OPTIONS, MAP_ANIMATION_LENGTH, MAP_ANIMATION_SPEED, DEFAULT_GEOLOCATION_OPTIONS, DEFAULT_MAP_STYLE } from "../constants";

function MainPage() {
    return (<>
        <GeoLocationService geoLocationProps={DEFAULT_GEOLOCATION_OPTIONS} />
        <Coverage />
        <SideMenu />
        <Map
            animationLoopLength={MAP_ANIMATION_LENGTH}
            animationSpeed={MAP_ANIMATION_SPEED}
            mapStyle={process.env.REACT_APP_MAPBOX_STYLE ?? DEFAULT_MAP_STYLE}
            buildingOptions={DEFAULT_BUILDING_OPTIONS} />
        <LayerController routeLayers={[]} />
    </>);
};

export default MainPage;