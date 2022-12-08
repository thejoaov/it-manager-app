import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as localStorage from '@services/localStorage';
import { DEV_URL } from '@constants/api';

export const apiInstance = axios.create({
  baseURL: DEV_URL,
});

localStorage.getItem('url').then((res) => {
  if (res) {
    console.log('[AXIOS] BASE_URL:', res);
    apiInstance.defaults.baseURL = res;
  } else {
    console.log('[AXIOS] BASE_URL:', DEV_URL);
    apiInstance.defaults.baseURL = DEV_URL;
  }
});

export const apiLogger = (config: {
  request?: AxiosRequestConfig;
  response?: AxiosResponse;
  error?: any;
}) => {
  if (config.request) {
    console.log(
      `Request: [${config.request.method?.toUpperCase()}]`,
      JSON.stringify(config.request)
    );
  }
  if (config.response) {
    console.log(
      `Response: [${config.response.config.method?.toUpperCase()} ${
        config.response.status
      } ${config.response.config?.baseURL}/${config.response.config.url}]`,
      JSON.stringify(config.response.data)
    );
  }
  if (config.error) {
    console.log(
      `Error: [${config.error.status}]`,
      JSON.stringify(config.error)
    );
  }
};

apiInstance.interceptors.response.use(
  (response) => {
    apiLogger({
      response,
    });
    return response;
  },
  (error) => {
    apiLogger({
      error,
    });
    if (error.response.status === 401) {
      localStorage.removeItem('token');
    }

    return Promise.reject(error.response.data);
  }
);

apiInstance.interceptors.request.use((request) => {
  apiLogger({
    request,
  });
  return request;
});

export const parseQueryString = (data: Record<string, any>): string => {
  return `?${new URLSearchParams(data).toString()}`;
};
