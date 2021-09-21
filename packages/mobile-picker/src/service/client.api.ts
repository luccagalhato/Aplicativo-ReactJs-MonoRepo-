import api, { ApiResponse } from "apisauce";
import { Address, GoogleMapsAddress, LatLng, User } from "../common/interfaces";
import { URL_ENDPOINT_CLIENT } from "./apis-endpoint";

export const clientApi = api.create({
  baseURL: URL_ENDPOINT_CLIENT,
  headers: { "Content-Type": "application/json" },
});

export const createUser = async (user: Partial<User>) =>
  clientApi.post("/", user);

export const updateClient = async (id: string, user: Partial<User>) => {
  try {
    const resp = await clientApi.put(`/${id}`, user);
    return resp;
  } catch (error) {
    return error;
  }
};

export const updateClientGoogleLocation = async (
  id: string,
  googleMapsAddress: GoogleMapsAddress
): Promise<ApiResponse<Address, Address>> => {
  try {
    const resp = await clientApi.put<Address>(
      `/address/google-location/${id}`,
      googleMapsAddress
    );
    return resp;
  } catch (error) {
    return error;
  }
};

export const updateClientAddressSurname = async (
  id: string,
  delivery_address: Partial<Address>
): Promise<ApiResponse<User>> => {
  try {
    const resp = await clientApi.put<User>(
      `/address/surname/${id}`,
      delivery_address
    );
    return resp;
  } catch (error) {
    return error;
  }
};

export const updateClientLatLon = async (
  id: string,
  latLon: LatLng
): Promise<ApiResponse<Address>> => {
  try {
    const resp = await clientApi.put<Address>(`/address/lat-lng/${id}`, latLon);
    return resp;
  } catch (error) {
    return error;
  }
};

export const changeEmailNotification = async (emailNotification: boolean) => {
  try {
    // await clientApi.patch(`change-email-notification`, emailNotification)
    return emailNotification;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const changeSMSNotification = async (emailNotification: boolean) => {
  try {
    // await clientApi.patch(`change-sms-notification`, emailNotification)
    return emailNotification;
  } catch (error) {
    console.log(error);
    return error;
  }
};
