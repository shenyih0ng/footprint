import { connect } from 'react-redux'
import { State } from '../store/state'
import { TripsLayerProps } from '@deck.gl/geo-layers/trips-layer/trips-layer';
import LayerElement from './LayerElement';
import { routesToBbox } from '../lib/route';

interface LayerControllerProps {
    routeLayers: TripsLayerProps<any>[]
}

function LayerController({ routeLayers }: LayerControllerProps) {
    return (
        <div className="flex absolute right-2 bottom-10 flex-col">
            {routeLayers.map((routeLayer, idx) => {
                return <LayerElement
                    key={idx}
                    id={routeLayer.id || '<no-name>'}
                    boundingBox={routesToBbox(routeLayer.data.map((route: any) => route.route))} />
            })}
        </div>
    )
}

export default connect(
    (state: State) => {
        return {
            routeLayers: state.routes.layers
        }
    },
    null
)(LayerController)