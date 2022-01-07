import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TripsLayerProps } from '@deck.gl/geo-layers/trips-layer/trips-layer';
import { RouteData } from '../lib/route';
import { DEFAULT_TRAIL_OPTIONS } from '../constants';

export interface RouteState {
  layers: TripsLayerProps<any>[];
}

export interface AddRoutePayload {
  id: string;
  data: RouteData[];
}

const routeInitialState: RouteState = {
  layers: []
};

export const routeSlice = createSlice({
  name: 'routes',
  initialState: routeInitialState,
  reducers: {
    addRoute: (state: RouteState, action: PayloadAction<AddRoutePayload>) => {
      const { id, data }: AddRoutePayload = action.payload;
      state.layers.push({
        id,
        data,
        trailLength: 400,
        capRounded: true,
        jointRounded: true,
        widthMinPixels: 2,
        opacity: DEFAULT_TRAIL_OPTIONS.opacity,
        getColor: DEFAULT_TRAIL_OPTIONS.color
      });
    }
  }
});

export const { addRoute } = routeSlice.actions;

export default routeSlice.reducer;
