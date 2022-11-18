import { ProfileWithUser } from '@models/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type HomeTabParamList = {
  Dashboard: undefined;
  TicketList: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: { login: string; password: string } | undefined;
  Register: undefined;
};

export type AppStackParamList = {
  ProfileEdit: undefined;
  SearchProfile: { type: 'opener' | 'assignee'; headerTitle?: string };
  NewTicket:
    | { assignee?: ProfileWithUser; opener?: ProfileWithUser }
    | undefined;
  Profile: undefined;
  TicketList: undefined;
  Dashboard: undefined;
  Home: undefined;
};

export type GlobalParamList = AuthStackParamList &
  AppStackParamList &
  HomeTabParamList;

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  NativeStackScreenProps<GlobalParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<GlobalParamList, T>;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<GlobalParamList, T>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends GlobalParamList {}
  }
}
