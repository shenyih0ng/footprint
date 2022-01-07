import { connect } from 'react-redux';
import { addRoute, AddRoutePayload } from '../store/routes';
import { DUMMY_ROUTE_DATA } from '../test';

export interface NikeModalProps {
    addRoute: (payload: AddRoutePayload) => void
    closeModal: () => void
}

function NikeModal({ addRoute, closeModal }: NikeModalProps) {
    const onImport = () => {
        // Test with dummy data
        addRoute({ id: 'Nike+ Runs', data: DUMMY_ROUTE_DATA });
        closeModal()
    }

    return (
        <div className="flex overflow-x-hidden overflow-y-auto fixed inset-1 z-50 justify-center items-center outline-none focus:outline-none">
            <div className="relative my-3 mx-auto w-auto max-w-3xl">
                <div className="flex relative flex-col w-full bg-gray-100/75 rounded-lg border-0 outline-none focus:outline-none shadow-lg">
                    <div className="flex justify-between items-start p-5 rounded-t">
                        <h3 className="text-xl font-medium">
                            import nike+ runs
                        </h3>
                    </div>
                    <div className="flex justify-end items-center p-6 mt-2 rounded-b">
                        <button
                            className="py-2 px-6 mr-1 mb-1 text-sm font-bold text-red-500 uppercase outline-none focus:outline-none transition-all duration-150 ease-linear"
                            onClick={() => closeModal()}
                        >
                            Close
                        </button>
                        <button
                            className="py-3 px-6 mr-1 mb-1 text-sm font-bold text-white uppercase bg-emerald-500 active:bg-emerald-600 rounded outline-none focus:outline-none shadow hover:shadow-lg transition-all duration-150 ease-linear"
                            onClick={() => onImport()}
                        >
                            Import
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(
    null,
    (dispatch) => {
        return {
            addRoute: (payload: AddRoutePayload) => dispatch(addRoute(payload))
        }
    }
)(NikeModal)