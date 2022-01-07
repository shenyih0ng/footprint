import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_VIEW_STATE } from '../constants';
import { ViewStateProps } from '@deck.gl/core/lib/deck';

export interface ViewPortState extends ViewStateProps {}
export interface SetViewPortPayload extends Partial<ViewPortState> {}

const initialViewPortState: ViewPortState = DEFAULT_VIEW_STATE;

export const viewPortSlice = createSlice({
  name: 'viewport',
  initialState: initialViewPortState,
  reducers: {
    setViewPort: (
      state: ViewPortState,
      action: PayloadAction<SetViewPortPayload>
    ) => {
      state = {
        ...state,
        ...action.payload
      };
    }
  }
});

export const { setViewPort } = viewPortSlice.actions;

export default viewPortSlice.reducer;