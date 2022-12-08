import { Profile, ProfileWithUser, User } from '@models/user';
import { Ticket, TicketFull } from '@models/tickets';

export type RoleFilter =
  | 'except-guest'
  | 'admin-personel'
  | 'all'
  | 'admin'
  | 'guest'
  | 'manager'
  | 'support'
  | 'technician'
  | 'user';

export type Meta = {
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

export type ResponseWithPagination<T> = {
  meta: Meta;
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
export type ResponseGetTickets = ResponseWithPagination<TicketFull[]>;

export type RequestGetTicketById = {
  id: number;
};
export type ResponseGetTicketById = TicketFull;

export type RequestPutTicketById = Partial<
  Omit<Ticket, 'id' | 'created_at' | 'updated_at'>
> & { id: number };
export type ResponsePutTicketById = Ticket;

export type RequestPostTicket = Omit<
  Ticket,
  'id' | 'created_at' | 'updated_at' | 'opener' | 'assignee'
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
  filterByRole?: RoleFilter;
}>;
export type ResponseGetProfiles = ResponseWithPagination<ProfileWithUser[]>;

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

export type ResponseGetDashboard = {
  open: TicketFull[] | null;
  solving: TicketFull[] | null;
};

export type ResponseGetTicketsCount = {
  open: number;
  total: number;
  solving: number;
};
