import axios, { AxiosResponse } from "axios";
import {
  RequestLogin,
  RequestRegister,
  ResponseLogin,
  ResponseRegister,
} from "./types";

export const BASE_URL = "http://localhost:3333";

export const apiInstance = axios.create({
  baseURL: BASE_URL,
});

export const apiLogger = (config: {
  url?: string;
  method?: string;
  status?: number;
  data?: any;
  type: "request" | "response";
}) => {
  const requestLogByType = {
    request: `[${config.method?.toUpperCase()}]: ${config.url}`,
    response: `[${config.status} ${config.method?.toUpperCase()}] [${
      config.url
    }/${config.url}]`,
  };

  console.log(requestLogByType[config.type], JSON.stringify(config.data));
};

apiInstance.interceptors.request.use((request) => {
  apiLogger({
    url: request.url,
    method: request.method,
    data: request.data,
    type: "request",
  });
  return request;
});

apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    apiLogger({
      type: "response",
      status: response.status,
      url: response.config.url,
      method: response.config.method,
      data: response.data,
    });
    return response;
  },
  (error) => {
    apiLogger({
      type: "response",
      status: error.response.status,
      url: error.response.config.url,
      method: error.response.config.method,
      data: error.response.data,
    });
    return Promise.reject(error.response.data);
  }
);

const apiService = {
  postLogin: async (
    data: RequestLogin
  ): Promise<AxiosResponse<ResponseLogin>> => {
    return apiInstance.post<ResponseLogin>("login", data);
  },
  getProfile: async (data: { userId: string }): Promise<AxiosResponse> => {
    return apiInstance.get(`profile/${data.userId}`);
  },
  postRegister: async (
    data: RequestRegister
  ): Promise<AxiosResponse<ResponseRegister>> => {
    return apiInstance.post<ResponseRegister>("users", data);
  },
};

export default apiService;
