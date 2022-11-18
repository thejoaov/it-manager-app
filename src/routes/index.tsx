import { useAuthContext } from '@contexts/auth';
import { useToastContext } from '@contexts/toast';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getToastColor } from '@utils/colors';
import { Snackbar, useTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useNavigationTheme } from '@hooks/useTheme';

import {
  AppStackParamList,
  AuthStackParamList,
  HomeTabParamList,
} from './types';

// Import screens
import SearchProfile from '@pages/Tickets/SearchProfile';
import ProfileEdit from '@pages/Home/ProfileEdit';
import NewTicket from '@pages/Tickets/NewTicket';
import Profile from '@pages/Home/Profile';
import TicketList from '@pages/Home/TicketList';
import Dashboard from '@pages/Home/Dashboard';
import Login from '@pages/Auth/Login';
import Register from '@pages/Auth/Register';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AuthRouter = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

const HomeBottomTab = createMaterialBottomTabNavigator<HomeTabParamList>();
const HomeBottomTabRouter = () => {
  const theme = useTheme();
  return (
    <HomeBottomTab.Navigator
      initialRouteName="Dashboard"
      // shifting
      sceneAnimationEnabled
      labeled={false}
      barStyle={{
        backgroundColor: theme.colors.inverseOnSurface,
      }}
    >
      <HomeBottomTab.Screen
        name="TicketList"
        component={TicketList}
        options={{
          tabBarIcon: 'format-list-bulleted',
          // tabBarColor: theme.colors.secondary,
        }}
      />
      <HomeBottomTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: 'home',
          // tabBarColor: theme.colors.primary,
        }}
      />
      <HomeBottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: 'account',
          // tabBarColor: theme.colors.tertiary,
        }}
      />
    </HomeBottomTab.Navigator>
  );
};

const AppStack = createStackNavigator<AppStackParamList>();
const AppRouter = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      {/* App Routes */}
      <AppStack.Group
        screenOptions={{
          // presentation: 'modal',
          animationEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      >
        <AppStack.Screen name="SearchProfile" component={SearchProfile} />
        <AppStack.Screen name="ProfileEdit" component={ProfileEdit} />
        <AppStack.Screen name="NewTicket" component={NewTicket} />
      </AppStack.Group>
      <AppStack.Group>
        <AppStack.Screen name="Home" component={HomeBottomTabRouter} />
      </AppStack.Group>
    </AppStack.Navigator>
  );
};

const Router = () => {
  const { closeToast, isToastVisible, toast } = useToastContext();
  const { token, user } = useAuthContext();

  return (
    <>
      <NavigationContainer theme={useNavigationTheme()}>
        {token && user ? <AppRouter /> : <AuthRouter />}
      </NavigationContainer>
      {isToastVisible && (
        <Snackbar
          visible={isToastVisible}
          onDismiss={closeToast}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: getToastColor(toast.type),
            marginBottom: 85,
          }}
          action={toast?.action}
        >
          {toast?.text}
        </Snackbar>
      )}
    </>
  );
};

export default Router;
