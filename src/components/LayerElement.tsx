import { connect } from 'react-redux'
import { MAP_ZOOM } from '../constants';
import { flyToLocation, FlyToLocationPayload } from '../store/viewport';

interface LayerElementProp {
    key: number,
    id: string,
    boundingBox: number[],
    flyToLayer: (payload: FlyToLocationPayload) => void;
}

function LayerElement({ id, boundingBox, flyToLayer }: LayerElementProp) {
    return (
        <span
            className="py-2 px-3 my-1 text-lg antialiased bg-gray-100/75 hover:bg-gray-200 rounded-full shadow-md hover:cursor-pointer"
            onClick={() => {
                flyToLayer({
                    zoom: MAP_ZOOM + 2, // magic number
                    longitude: (boundingBox[0] + boundingBox[2]) / 2,
                    latitude: (boundingBox[1] + boundingBox[3]) / 2
                })
            }}>
            {id}
        </span>
    )
}

export default connect(
    null,
    (dispatch) => {
        return {
            flyToLayer: (payload: FlyToLocationPayload) => dispatch(flyToLocation(payload))
        }
    }
)(LayerElement);