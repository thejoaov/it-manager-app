import { TicketFull } from '@models/tickets';
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
  Ticket: {
    type: 'edit' | 'new' | 'details';
    ticket?: Partial<TicketFull>;
  };
  ProfileEdit: undefined;
  SearchProfile: {
    type: 'opener' | 'assignee';
    backType: 'edit' | 'new' | 'details';
    headerTitle?: string;
  };
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
