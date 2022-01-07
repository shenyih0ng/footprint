import { GeoPositionState } from "./geopos";
import { RouteState } from "./routes";
import { ViewPortState } from "./viewport";

export interface State {
  routes: RouteState
  viewport: ViewPortState,
  geopos: GeoPositionState
}