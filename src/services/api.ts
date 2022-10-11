// POST         /login
// POST         /users
// GET|HEAD     /users/:id
// PUT|PATCH    /users/:id
// DELETE       /users/:id
// GET|HEAD     /profile/:id
// PUT          /profile/:id
// POST         /profile/:id

import axios, { AxiosResponse } from "axios";

export const BASE_URL = "http://192.168.0.47:3333";

const request = async (
  url: string,
  options: RequestInit
): Promise<Response> => {
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  return fetch(`${BASE_URL}/${url}`, {
    headers,
    body: JSON.stringify(options.body),
    ...options,
  });
};

const api = {
  login: async (data: {
    login: string;
    password: string;
  }): Promise<AxiosResponse | null> => {
    return axios.post(`${BASE_URL}/login`, data);
  },
};

export default api;
