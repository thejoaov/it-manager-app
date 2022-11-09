import { useToastContext } from "@contexts/toast";
import React, { useState, useCallback } from "react";
import { Button } from "react-native-paper";
import Container from "@components/atoms/Container";
import Input from "@components/atoms/Input";
import { useAuthContext } from "@contexts/auth";
import { AuthStackScreenProps } from "@routes/types";
import Flexbox from "@components/atoms/Flexbox";

const Login: React.FC<AuthStackScreenProps<"Login">> = ({
  navigation,
  route,
}) => {
  const [login, setLogin] = useState(route.params?.login || "");
  const [password, setPassword] = useState(route.params?.password || "");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToastContext();
  const { login: requestLogin } = useAuthContext();

  const handleLogin = useCallback(async () => {
    try {
      setLoading(true);

      await requestLogin({
        login,
        password,
      });
    } catch (error: any) {
      if (__DEV__ && error.errors[0].message) {
        showToast({
          text: error.errors[0].message,
          type: "error",
        });
      } else {
        showToast({
          text: "Erro ao fazer login",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [login, password]);

  const navigateToRegister = useCallback(() => {
    navigation.navigate("Register");
  }, []);

  return (
    <Flexbox justifyContent="center" p={20} testID="login">
      <Container my="5px">
        <Input
          mode="outlined"
          label="Login"
          value={login}
          placeholder="Email or Username"
          onChangeText={setLogin}
          defaultValue={route.params?.login}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
        />
      </Container>

      <Container my="5px">
        <Input
          mode="outlined"
          label="Password"
          secureTextEntry
          showSecureButton
          value={password}
          defaultValue={route.params?.password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoComplete="password"
        />
      </Container>

      <Container mt={30}>
        <Container>
          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading || !login || !password}
          >
            Login
          </Button>
        </Container>

        <Container mt={10}>
          <Button onPress={navigateToRegister}>Register</Button>
        </Container>
      </Container>
    </Flexbox>
  );
};
export default Login;
