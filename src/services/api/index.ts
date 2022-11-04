import axios, { AxiosResponse } from "axios";
import {
  RequestLogin,
  RequestRegister,
  ResponseLogin,
  ResponseRegister,
} from "./types";

export const BASE_URL = "http://localhost:3333";

export const HTTPClient = axios.create({
  baseURL: BASE_URL,
});

HTTPClient.interceptors.request.use((request) => {
  console.log(
    `[${request.method?.toUpperCase()}]: ${request.url}`,
    JSON.stringify(request.data)
  );
  return request;
});

HTTPClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(
      `[${response.status} ${response.config.method?.toUpperCase()}] [${
        response.config.baseURL
      }/${response.config.url}]`,
      JSON.stringify(response.data)
    );
    return response;
  },
  (error) => {
    console.log(error.response.config);
    console.log(
      `[${
        error.response.status
      } ${error.response.config.method?.toUpperCase()}] [${
        error.response.config.baseURL
      }/${error.response.config.url}]`,
      JSON.stringify(error.response.data)
    );
    return Promise.reject(error.response.data);
  }
);

const api = {
  login: async (data: RequestLogin): Promise<AxiosResponse<ResponseLogin>> => {
    return HTTPClient.post<ResponseLogin>("login", data);
  },
  getProfile: async (data: { userId: string }): Promise<AxiosResponse> => {
    return HTTPClient.get(`profile/${data.userId}`);
  },
  register: async (
    data: RequestRegister
  ): Promise<AxiosResponse<ResponseRegister>> => {
    return HTTPClient.post<ResponseRegister>("users", data);
  },
};

export default api;
