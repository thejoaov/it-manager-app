import { User } from "@types/user";

export type RequestLogin = {
  login: string;
  password: string;
};

export type ResponseLogin = {
  token: string;
  user: User;
  remember_me_token: string | null;
  updated_at: string;
  username: string;
};
