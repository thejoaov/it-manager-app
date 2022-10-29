import axios, { AxiosResponse } from "axios";
import { RequestLogin, ResponseLogin } from "./types";

export const BASE_URL = "http://localhost:3333";

export const HTTPClient = axios.create({
  baseURL: BASE_URL,
});

HTTPClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
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
};

export default api;
