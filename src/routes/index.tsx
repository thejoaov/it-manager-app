import { useAuthContext } from '@contexts/auth';
import { useToastContext } from '@contexts/toast';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getToastColor } from '@utils/colors';
import { Snackbar } from 'react-native-paper';

import {
  AppStackParamList,
  AuthStackParamList,
  HomeTabParamList,
} from './types';

// Import screens
import Profile from '@pages/Home/Profile';
import TicketList from '@pages/Home/TicketList';
import Dashboard from '@pages/Home/Dashboard';
import Login from '@pages/Auth/Login';
import Register from '@pages/Auth/Register';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import useTheme, { useNavigationTheme } from '@hooks/useTheme';

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
      inactiveColor={theme.colors.backdrop}
      activeColor={theme.colors.backdrop}
      // eslint-disable-next-line react-native/no-inline-styles
      barStyle={{
        backgroundColor: theme.colors.inversePrimary,
        height: 80,
      }}
      labeled={false}
    >
      <HomeBottomTab.Screen
        name="TicketList"
        component={TicketList}
        options={{
          tabBarIcon: 'format-list-bulleted',
        }}
      />
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
      <AppStack.Group>
        <AppStack.Screen name="Home" component={HomeBottomTabRouter} />
      </AppStack.Group>
    </AppStack.Navigator>
  );
};

const Router = () => {
  const { closeToast, isToastVisible, toast } = useToastContext();
  const { token, user } = useAuthContext();
  const navigationTheme = useNavigationTheme();

  return (
    <>
      <NavigationContainer theme={navigationTheme}>
        {token && user ? <AppRouter /> : <AuthRouter />}
      </NavigationContainer>

      {isToastVisible && (
        <Snackbar
          visible={isToastVisible}
          onDismiss={closeToast}
          style={{ backgroundColor: getToastColor(toast.type) }}
          action={toast?.action}
        >
          {toast?.text}
        </Snackbar>
      )}
    </>
  );
};

export default Router;
