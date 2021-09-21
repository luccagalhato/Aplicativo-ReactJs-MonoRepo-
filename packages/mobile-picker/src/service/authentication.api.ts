import api, { ApiResponse } from "apisauce";
import { AppTypeEnum } from "../common/enums";
import { UserRegistration } from "../common/interfaces";
import { URL_ENDPOINT_AUTHENTICATION } from "./apis-endpoint";

const authenticationApi = api.create({
  baseURL: URL_ENDPOINT_AUTHENTICATION,
  headers: { "Content-Type": "application/json" },
});

export const registerUser = async (
  user: UserRegistration
): Promise<ApiResponse<any>> => {
  try {
    const currUser = { ...user, appType: AppTypeEnum.COLLABORATOR_APP };
    const resp = await authenticationApi.post("/sign-up", currUser);

    console.log("resposta ->>>    ", resp);

    return resp;
  } catch (error) {
    return error;
  }
};

export const authenticationUser = async (user: UserRegistration) => authenticationApi.post<any>("/sign-in", user)

export const confirmCode = async (user: UserRegistration, code: string) =>
  authenticationApi.post("/confirm-sign-up-getting-leed", {
    user,
    code,
  });

export const deleteCognitoUser = async (user: UserRegistration) =>
  authenticationApi.post(`/delete`, user);

export const resendConfirmationCode = async (user: UserRegistration) =>
  authenticationApi.post(`/resend-code`, user);
