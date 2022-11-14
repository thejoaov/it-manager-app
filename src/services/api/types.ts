import { Profile, User } from '@models/user';
import { Ticket } from '@models/tickets';

export type ResponseWithPagination<T> = {
  meta: {
    total: number;
    per_page: number;
    current_page: number | null;
    last_page: number;
    first_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    previous_page_url: string | null;
  };
  data: T;
};

export type RequestWithPagination<T> = {
  page?: number;
  per_page?: number;
  sort?: string;
  order?: string;
  filter?: string;
} & T;

export type RequestPostLogin = {
  login: string;
  password: string;
};
export type ResponsePostLogin = {
  token: string;
  user: User;
  remember_me_token: string | null;
  updated_at: string;
  username: string;
};

export type RequestPostUsers = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};
export type ResponsePostUsers = User;

export type RequestGetUserById = {
  id: number;
};
export type ResponseGetUserById = User;

export type RequestPutUserById = {
  userId: number;
  body: {
    email?: string;
    username?: string;
    password?: string;
    passwordConfirmation?: string;
  };
};
export type ResponsePutUserById = User;

export type RequestDeleteUserById = {
  id: number;
};
export type ResponseDeleteUserById = void;

export type RequestGetTickets = RequestWithPagination<{
  status?: 'open' | 'closed' | 'solving';
  priority?: 'low' | 'medium' | 'high';
}>;
export type ResponseGetTickets = ResponseWithPagination<Ticket[]>;

export type RequestGetTicketById = {
  id: number;
};
export type ResponseGetTicketById = Ticket;

export type RequestPutTicketById = Partial<
  Omit<Ticket, 'id' | 'created_at' | 'updated_at'>
> & { id: number };
export type ResponsePutTicketById = Ticket;

export type RequestPostTicket = Omit<
  Ticket,
  'id' | 'created_at' | 'updated_at'
>;
export type ResponsePostTicket = Ticket;

export type RequestDeleteTicketById = {
  id: number;
};
export type ResponseDeleteTicketById = void;

export type RequestGetProfiles = RequestWithPagination<{
  name?: string;
  username?: string;
  email?: string;
}>;
export type ResponseGetProfiles = ResponseWithPagination<Profile[]>;

export type RequestGetProfileByUserId = {
  userId: string;
};
export type ResponseGetProfileByUserId = Profile;

export type RequestPostProfileByUserId = {
  userId: string;
  body: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
};
export type ResponsePostProfileByUserId = Profile;

export type RequestPutProfileByUserId = {
  userId: string;
  body: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
};
export type ResponsePutProfileByUserId = Profile;
