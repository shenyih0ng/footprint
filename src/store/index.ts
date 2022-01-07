import { configureStore } from '@reduxjs/toolkit'
import routeReducer from './routes';
import viewportReducer from './viewport';

export default configureStore({
  reducer: {
      routes: routeReducer,
      viewport: viewportReducer
  },
})