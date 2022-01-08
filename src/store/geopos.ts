import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SG_LATLNG_CENTER } from '../constants';

export interface GeoPosition {
  latitude: number;
  longitude: number;
  lastUpdated: number;
  altitude?: number;
}

export interface GeoPositionState {
  currentPosition: GeoPosition,
  history: GeoPosition[]
}

export interface SetGeoPositionPayload {
  latitude: number;
  longitude: number;
  altitude?: number;
}

const geoposInitialState: GeoPositionState = {
  currentPosition: {
    latitude: SG_LATLNG_CENTER[0],
    longitude: SG_LATLNG_CENTER[1],
    lastUpdated: Date.now()
  },
  history: []
};

export const geposSlice = createSlice({
  name: 'geopos',
  initialState: geoposInitialState,
  reducers: {
    setGeoPos: (
      state: GeoPositionState,
      action: PayloadAction<SetGeoPositionPayload>
    ) => {
      const { latitude, longitude, altitude }: SetGeoPositionPayload =
        action.payload;
      state.history.push(state.currentPosition)
      state.currentPosition = {
        latitude,
        longitude,
        altitude,
        lastUpdated: Date.now()
      };
    }
  }
});

export const { setGeoPos } = geposSlice.actions;

export default geposSlice.reducer;
