import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GeoPositionState {
    data: {
      latitude: number,
      longitude: number,
      altitude: number | null,
    } | null;
}
  
export interface SetGeoPositionPayload {
    latitude: number,
    longitude: number,
    altitude: number | null,
  }

const geoposInitialState: GeoPositionState = {
    data: null
};

export const geposSlice = createSlice({
    name: 'geopos',
    initialState: geoposInitialState,
    reducers: {
      setGeoPos: (state: GeoPositionState, action: PayloadAction<SetGeoPositionPayload>) => {
        const data: SetGeoPositionPayload = action.payload;
        state.data = data;
      }
    }
});

export const { setGeoPos } = geposSlice.actions;

export default geposSlice.reducer;