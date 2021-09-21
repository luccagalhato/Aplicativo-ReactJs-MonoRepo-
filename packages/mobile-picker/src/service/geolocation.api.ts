import api, { ApiResponse } from "apisauce";
import { GoogleMapsAddress } from "../common/interfaces";
import { URL_ENDPOINT_GEOLOCATION } from "./apis-endpoint";

export const geolocationApi = api.create({
  baseURL: URL_ENDPOINT_GEOLOCATION,
});

export const getGoogleMapsAddress = async (
  query: string
): Promise<ApiResponse<GoogleMapsAddress[]>> =>
  geolocationApi.get<GoogleMapsAddress[]>("/google-map-api", { input: query });
