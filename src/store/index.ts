import { configureStore } from '@reduxjs/toolkit'
import routeReducer from './routes';
import viewportReducer from './viewport';
import geoposReducer from './geopos'

export default configureStore({
  reducer: {
      routes: routeReducer,
      viewport: viewportReducer,
      geopos: geoposReducer
  },
})