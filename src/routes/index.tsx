import { useToastContext } from "@contexts/toast";
import Login from "@pages/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getToastColor } from "@utils/colors";
import { Snackbar } from "react-native-paper";

const AuthStack = createNativeStackNavigator();
const AuthRouter = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
};

const Router = () => {
  const { closeToast, isToastVisible, toast } = useToastContext();
  return (
    <>
      <NavigationContainer>
        <AuthRouter />
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
