export type Profile = {
  id: number;
  user_id: number;
  name: string;
  birthdate: string;
  role: 'admin' | 'user' | 'guest' | 'support' | 'manager' | 'technician';
  telephone: string;
  job_title: string;
  start_date: string;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: number;
  email: string;
  username: string;
  remember_me_token: string | null;
  created_at: string;
  updated_at: string;
  profile: Profile | null;
};

export type ProfileWithUser = Profile & { user: Omit<User, 'profile'> };
