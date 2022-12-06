import { AxiosResponse } from 'axios';
import lodash from 'lodash';
import { apiInstance, parseQueryString } from './config';
import {
  RequestDeleteTicketById,
  RequestDeleteUserById,
  RequestGetProfileByUserId,
  RequestGetProfiles,
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
  ResponseGetDashboard,
  ResponseGetProfileByUserId,
  ResponseGetProfiles,
  ResponseGetTicketById,
  ResponseGetTickets,
  ResponseGetTicketsCount,
  ResponseGetUserById,
  ResponsePostLogin,
  ResponsePostProfileByUserId,
  ResponsePostTicket,
  ResponsePostUsers,
  ResponsePutProfileByUserId,
  ResponsePutUserById,
} from './types';

const apiService = {
  postLogin: async (
    data: RequestPostLogin
  ): Promise<AxiosResponse<ResponsePostLogin>> => {
    return apiInstance.post<ResponsePostLogin>('login', data);
  },
  postUsers: async (
    data: RequestPostUsers
  ): Promise<AxiosResponse<ResponsePostUsers>> => {
    return apiInstance.post<ResponsePostUsers>('users', data);
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
  getProfiles: async (
    data?: RequestGetProfiles
  ): Promise<AxiosResponse<ResponseGetProfiles>> => {
    return apiInstance.get(`profiles/${data ? parseQueryString(data) : ''}`);
  },
  postProfileByUserId: async (
    data: RequestPostProfileByUserId
  ): Promise<AxiosResponse<ResponsePostProfileByUserId>> => {
    return apiInstance.post(`profile/${data.userId}`, data.body);
  },
  putProfileByUserId: async (
    data: RequestPutProfileByUserId
  ): Promise<AxiosResponse<ResponsePutProfileByUserId>> => {
    const body = lodash.omit(data.body, ['created_at', 'updated_at']);
    return apiInstance.put(
      `profile/${data.userId}`,
      lodash.pickBy(body, (value) => value !== undefined || value !== null)
    );
  },
  getTickets: async (
    data?: RequestGetTickets
  ): Promise<AxiosResponse<ResponseGetTickets>> => {
    return apiInstance.get(`tickets/${data ? parseQueryString(data) : ''}`);
  },
  getTicketById: async (
    data: RequestGetTicketById
  ): Promise<AxiosResponse<ResponseGetTicketById>> => {
    return apiInstance.get(`tickets/${data.id}`);
  },
  putTicketById: async (
    data: RequestPutTicketById
  ): Promise<AxiosResponse<ResponseGetTicketById>> => {
    const body = lodash.omit(data, ['created_at', 'updated_at']);
    return apiInstance.put(
      `tickets/${data.id}`,
      lodash.pickBy(body, (value) => value !== undefined || value !== null)
    );
  },
  postTicket: async (
    data: RequestPostTicket
  ): Promise<AxiosResponse<ResponsePostTicket>> => {
    return apiInstance.post('tickets', data);
  },
  deleteTicketById: async (
    data: RequestDeleteTicketById
  ): Promise<AxiosResponse<ResponseDeleteTicketById>> => {
    return apiInstance.delete(`tickets/${data.id}`);
  },
  getDashboard: async (): Promise<AxiosResponse<ResponseGetDashboard>> => {
    return apiInstance.get('dashboard');
  },
  getTicketsCount: async (): Promise<
    AxiosResponse<ResponseGetTicketsCount>
  > => {
    return apiInstance.get('tickets/count');
  },
};

export default apiService;
