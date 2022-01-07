import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GeoPositionState {
    data: GeolocationPosition | null;
}
  
export interface SetGeoPositionPayload {
    geopos: GeolocationPosition
  }

const geposInitialState: GeoPositionState = {
    data: null
};

export const geposSlice = createSlice({
    name: 'geopos',
    initialState: geposInitialState,
    reducers: {
      setGeoPos: (state: GeoPositionState, action: PayloadAction<SetGeoPositionPayload>) => {
        const { geopos }: SetGeoPositionPayload = action.payload;
        state.data = geopos;
      }
    }
});

export const { setGeoPos } = geposSlice.actions;

export default geposSlice.reducer;