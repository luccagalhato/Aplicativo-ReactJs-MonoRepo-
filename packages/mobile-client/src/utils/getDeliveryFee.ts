import { distanceTo, LatLon } from "geolocation-utils";

const DELIVERY_FREE_PER_KM = 5;
const ONE_KM = 1000;

export default (from: LatLon, to: LatLon) => {
    const meters = distanceTo(from, to);
    return (meters / ONE_KM) * DELIVERY_FREE_PER_KM;
}