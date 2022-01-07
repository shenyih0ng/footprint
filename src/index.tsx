
import 'mapbox-gl/dist/mapbox-gl.css';

import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/map" element={<MainPage />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
