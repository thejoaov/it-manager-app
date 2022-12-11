import { Ticket } from '@models/tickets';
import { ProfileWithUser } from '@models/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RoleFilter } from '@services/api/types';

export type HomeTabParamList = {
  Dashboard: undefined;
  TicketList: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: { login: string; password: string } | undefined;
  Register: undefined;
  EasterEgg: undefined;
};

export type AppStackParamList = {
  EasterEgg: undefined;
  Ticket: {
    type: 'edit' | 'new' | 'details';
    ticket?: Partial<Ticket>;
  };
  ProfileEdit: undefined;
  SearchProfile: {
    roleFilter?: RoleFilter;
    headerTitle?: string;
    handleSelect: (profile: ProfileWithUser) => void;
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
