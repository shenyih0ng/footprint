import { RouteData } from "./lib/route";

export async function getAllRuns (): Promise<RouteData[]> {
    const endpoint = `${process.env.REACT_APP_BACKEND_API}/runs`
    const response = await fetch(endpoint);
    const responseJson = await response.json();

    return responseJson.data;
}