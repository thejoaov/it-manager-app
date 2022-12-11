import { useAuthContext } from '@contexts/auth';
import { useToastContext } from '@contexts/toast';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getToastColor } from '@utils/colors';
import { Snackbar, useTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useNavigationTheme } from '@hooks/useTheme';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {
  AppStackParamList,
  AuthStackParamList,
  HomeTabParamList,
} from './types';

// Import screens
import EasterEgg from '@pages/Auth/EasterEgg';
import Login from '@pages/Auth/Login';
import Register from '@pages/Auth/Register';
import Dashboard from '@pages/Home/Dashboard';
import ProfileEdit from '@pages/Profile/ProfileEdit';
import Profile from '@pages/Profile/Profile';
import SearchProfile from '@pages/Profile/SearchProfile';
import Ticket from '@pages/Ticket/Ticket';
import TicketList from '@pages/Ticket/TicketList';

const AuthStack = createStackNavigator<AuthStackParamList>();
const AuthRouter = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <AuthStack.Group
        screenOptions={{
          presentation: 'modal',
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      >
        <AuthStack.Screen name="EasterEgg" component={EasterEgg} />
      </AuthStack.Group>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

const HomeBottomTab = createMaterialBottomTabNavigator<HomeTabParamList>();
const HomeBottomTabRouter = () => {
  const theme = useTheme();
  const { user } = useAuthContext();

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
      {['admin', 'manager', 'technician', 'support'].includes(
        user?.profile?.role || ''
      ) && (
        <HomeBottomTab.Screen
          name="TicketList"
          component={TicketList}
          options={{
            tabBarIcon: 'format-list-bulleted',
          }}
        />
      )}
      <HomeBottomTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: 'home',
        }}
      />

      <HomeBottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: 'account',
        }}
      />
    </HomeBottomTab.Navigator>
  );
};

const AppStack = createNativeStackNavigator<AppStackParamList>();
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
          presentation: 'modal',
          // cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      >
        <AppStack.Screen name="SearchProfile" component={SearchProfile} />
        <AppStack.Screen name="ProfileEdit" component={ProfileEdit} />
        <AppStack.Screen name="Ticket" component={Ticket} />
        <AppStack.Screen name="EasterEgg" component={EasterEgg} />
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
