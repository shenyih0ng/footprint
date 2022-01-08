import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  MAP_TRANSITION_DURATION,
  MAP_ZOOM,
  SG_LATLNG_CENTER
} from '../constants';
import { ViewStateProps } from '@deck.gl/core/lib/deck';

export interface ViewPortState
  extends Omit<ViewStateProps, 'transitionInterpolator' | 'transitionEasing'> {
  lastUpdated: number;
}
export interface FlyToLocationPayload {
  longitude: number;
  latitude: number;
  zoom: number;
}

const initialViewPortState: ViewPortState = {
  latitude: SG_LATLNG_CENTER[0],
  longitude: SG_LATLNG_CENTER[1],
  zoom: MAP_ZOOM,
  transitionDuration: MAP_TRANSITION_DURATION,
  lastUpdated: Date.now()
};

export const viewPortSlice = createSlice({
  name: 'viewport',
  initialState: initialViewPortState,
  reducers: {
    flyToLocation: (
      state: ViewPortState,
      action: PayloadAction<FlyToLocationPayload>
    ) => {
      state.zoom = action.payload.zoom;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.lastUpdated = Date.now()
    }
  }
});

export const { flyToLocation } = viewPortSlice.actions;

export default viewPortSlice.reducer;
