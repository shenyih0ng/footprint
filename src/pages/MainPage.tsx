import { connect } from 'react-redux';
import LayerController from "../components/LayerController";
import Map from "../components/Map";
import SideMenu from "../components/SideMenu";
import { DEFAULT_BUILDING_OPTIONS, DEFAULT_GEOLOCATION_OPTIONS, MAP_ANIMATION_LENGTH, MAP_ANIMATION_SPEED, MAP_STYLE } from "../constants";
import GeoLocationService from '../components/GeoLocationService';

function MainPage() {

    return (<>
        <GeoLocationService geoLocationProps={DEFAULT_GEOLOCATION_OPTIONS} />
        <SideMenu />
        <Map
            animationLoopLength={MAP_ANIMATION_LENGTH}
            animationSpeed={MAP_ANIMATION_SPEED}
            mapStyle={MAP_STYLE}
            buildingOptions={DEFAULT_BUILDING_OPTIONS}
         />
        <LayerController routeLayers={[]} />
    </>);
};

export default MainPage;