import { useAuthContext } from "@contexts/auth";
import { useToastContext } from "@contexts/toast";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getToastColor } from "@utils/colors";
import { Snackbar } from "react-native-paper";

import { AppStackParamList, AuthStackParamList } from "./types";

// Import screens
import Dashboard from "@pages/Home/Dashboard";
import Login from "@pages/Auth/Login";
import Register from "@pages/Auth/Register";

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

const AppStack = createNativeStackNavigator<AppStackParamList>();
const AppRouter = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* App Routes */}
      <AppStack.Screen name="Dashboard" component={Dashboard} />
    </AppStack.Navigator>
  );
};

const Router = () => {
  const { closeToast, isToastVisible, toast } = useToastContext();
  const { token, user } = useAuthContext();
  return (
    <>
      <NavigationContainer>
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
