import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeTabParamList = {
  Dashboard: undefined;
  TicketList: undefined;
  Profile: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  NativeStackScreenProps<HomeTabParamList, T>;

export type AuthStackParamList = {
  Login: { login: string; password: string } | undefined;
  Register: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type AppStackParamList = {
  Profile: undefined;
  TicketList: undefined;
  Dashboard: undefined;
  Home: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

export type GlobalParamList = AuthStackParamList & AppStackParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends GlobalParamList {}
  }
}
