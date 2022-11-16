import { ProfileWithUser } from './user';

export type Ticket = {
  id: number;
  title: string;
  description: string;
  location: string;
  opener_id: number;
  status: string;
  assignee_id: number;
  priority: string;
  created_at: string;
  updated_at: string;
};

export type TicketFull = {
  id: number;
  title: string;
  description: string;
  location: string;
  opener_id: number;
  status: string;
  assignee_id: number;
  priority: string;
  created_at: string;
  updated_at: string;
  assignee: ProfileWithUser;
  opener: ProfileWithUser;
};
