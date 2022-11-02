import { useToastContext } from "@contexts/toast";
import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Container from "../../components/atoms/Container";
import Input from "../../components/atoms/Input";
import api, { HTTPClient } from "../../services/api";

const Login: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToastContext();

  const handleLogin = useCallback(async () => {
    try {
      setLoggedIn(false);
      setLoading(true);
      const authResponse = await api.login({ login, password });

      if (authResponse?.status === 200) {
        HTTPClient.defaults.headers.common.Authorization = `Bearer ${authResponse.data.token}`;
      }

      setLoggedIn(true);
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

  const handleRegister = useCallback(() => {
    // TO-DO
  }, []);

  return (
    <Container flex={1} justifyContent="center" p={20} testID="login">
      {/* {loggedIn && <Text variant="bodyMedium">Logged in!</Text>} */}

      <Container my="5px">
        <Input
          mode="outlined"
          label="Login"
          placeholder="Email or Username"
          onChangeText={setLogin}
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
          <Button onPress={handleRegister}>Register</Button>
        </Container>
      </Container>
    </Container>
  );
};
export default Login;
