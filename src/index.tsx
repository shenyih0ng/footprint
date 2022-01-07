
import 'mapbox-gl/dist/mapbox-gl.css';

import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import store from './store'
import { Provider } from 'react-redux'

import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  rootElement
);
