import { AxiosResponse } from "axios";
import { apiInstance, parseQueryString } from "./config";
import {
  RequestDeleteTicketById,
  RequestDeleteUserById,
  RequestGetProfileByUserId,
  RequestGetTicketById,
  RequestGetTickets,
  RequestGetUserById,
  RequestPostLogin,
  RequestPostProfileByUserId,
  RequestPostTicket,
  RequestPostUsers,
  RequestPutProfileByUserId,
  RequestPutTicketById,
  RequestPutUserById,
  ResponseDeleteTicketById,
  ResponseDeleteUserById,
  ResponseGetProfileByUserId,
  ResponseGetTicketById,
  ResponseGetTickets,
  ResponseGetUserById,
  ResponsePostLogin,
  ResponsePostProfileByUserId,
  ResponsePostTicket,
  ResponsePostUsers,
  ResponsePutProfileByUserId,
  ResponsePutUserById,
} from "./types";
import lodash from "lodash";

const apiService = {
  postLogin: async (
    data: RequestPostLogin
  ): Promise<AxiosResponse<ResponsePostLogin>> => {
    return apiInstance.post<ResponsePostLogin>("login", data);
  },
  postUsers: async (
    data: RequestPostUsers
  ): Promise<AxiosResponse<ResponsePostUsers>> => {
    return apiInstance.post<ResponsePostUsers>("users", data);
  },
  getUserById: async (
    data: RequestGetUserById
  ): Promise<AxiosResponse<ResponseGetUserById>> => {
    return apiInstance.get<ResponseGetUserById>(`users/${data.id}`);
  },
  putUserById: async (
    data: RequestPutUserById
  ): Promise<AxiosResponse<ResponsePutUserById>> => {
    const body = lodash.pickBy(data.body, (value) => value !== undefined);
    return apiInstance.put<ResponsePutUserById>(`users/${data.userId}`, body);
  },
  deleteUserById: async (
    data: RequestDeleteUserById
  ): Promise<AxiosResponse<ResponseDeleteUserById>> => {
    return apiInstance.delete(`users/${data.id}`);
  },
  getProfileByUserId: async (
    data: RequestGetProfileByUserId
  ): Promise<AxiosResponse<ResponseGetProfileByUserId>> => {
    return apiInstance.get(`profile/${data.userId}`);
  },
  postProfileByUserId: async (
    data: RequestPostProfileByUserId
  ): Promise<AxiosResponse<ResponsePostProfileByUserId>> => {
    return apiInstance.post(`profile/${data.userId}`, data.body);
  },
  putProfileByUserId: async (
    data: RequestPutProfileByUserId
  ): Promise<AxiosResponse<ResponsePutProfileByUserId>> => {
    const body = lodash.omit(data, ["id", "created_at", "updated_at"]);
    return apiInstance.put(`profile/${data.userId}`, body);
  },
  getTickets: async (
    data?: RequestGetTickets
  ): Promise<AxiosResponse<ResponseGetTickets>> => {
    return apiInstance.get(`tickets/${data ? parseQueryString(data) : ""}`);
  },
  getTicketById: async (
    data: RequestGetTicketById
  ): Promise<AxiosResponse<ResponseGetTicketById>> => {
    return apiInstance.get(`tickets/${data.id}`);
  },
  putTicketById: async (
    data: RequestPutTicketById
  ): Promise<AxiosResponse<ResponseGetTicketById>> => {
    const body = lodash.omit(data, ["id", "created_at", "updated_at"]);
    return apiInstance.put(`tickets/${data.id}`, body);
  },
  postTicket: async (
    data: RequestPostTicket
  ): Promise<AxiosResponse<ResponsePostTicket>> => {
    return apiInstance.post("tickets", data);
  },
  deleteTicketById: async (
    data: RequestDeleteTicketById
  ): Promise<AxiosResponse<ResponseDeleteTicketById>> => {
    return apiInstance.delete(`tickets/${data.id}`);
  },
};

export default apiService;
