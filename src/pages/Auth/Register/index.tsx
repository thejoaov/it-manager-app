import { useToastContext } from "@contexts/toast";
import React, { useState, useCallback } from "react";
import { Button } from "react-native-paper";
import Container from "@components/atoms/Container";
import Input from "@components/atoms/Input";
import apiService from "@services/api";
import { AuthStackScreenProps } from "@routes/types";
import { ApiError } from "@services/api/errors";
import Flexbox from "@components/atoms/Flexbox";

const Register: React.FC<AuthStackScreenProps<"Register">> = ({
  navigation,
}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, ApiError | undefined>>({
    email: undefined,
    username: undefined,
    password: undefined,
    passwordConfirmation: undefined,
  });

  const { showToast } = useToastContext();

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await apiService.postRegister({
        email,
        username,
        password,
        passwordConfirmation,
      });
      setErrors({
        email: undefined,
        username: undefined,
        password: undefined,
        passwordConfirmation: undefined,
      });
      showToast({
        text: "Success! Now login with your new account",
        type: "success",
        action: {
          label: "Login",
          onPress: () => {
            navigation.navigate("Login", { login: email, password });
          },
        },
        onDismiss: () => {
          navigation.navigate("Login", { login: email, password });
        },
      });
    } catch (error: any) {
      if (__DEV__ && error.errors[0].message) {
        showToast({
          text: error.errors.map((e: ApiError) => e.message).toString(),
          type: "error",
        });
        const apiError = error.errors as ApiError[];

        setErrors({
          email: apiError.find((e) => e.field === "email"),
          username: apiError.find((e) => e.field === "username"),
          password: apiError.find((e) => e.field === "password"),
          passwordConfirmation: apiError.find(
            (e) => e.field === "passwordConfirmation"
          ),
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
  }, [email, username, password]);

  const navigateToLogin = useCallback(() => {
    navigation.navigate("Login");
  }, []);

  return (
    <Flexbox justifyContent="center" p={20} testID="login">
      <Container my="5px">
        <Input
          mode="outlined"
          label="Email"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          error={errors.email?.message}
        />
      </Container>

      <Container my="5px">
        <Input
          mode="outlined"
          label="Username"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoComplete="username-new"
          keyboardType="twitter"
          error={errors.username?.message}
        />
      </Container>

      <Container my="5px">
        <Input
          mode="outlined"
          label="Password"
          secureTextEntry
          showSecureButton
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoComplete="password-new"
          error={errors.password?.message}
        />
      </Container>

      <Container my="5px">
        <Input
          mode="outlined"
          label="Password Confirmation"
          secureTextEntry
          showSecureButton
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          autoCapitalize="none"
          autoComplete="password-new"
          error={errors.passwordConfirmation?.message}
        />
      </Container>

      <Container mt={30}>
        <Container>
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={
              loading ||
              !email ||
              !username ||
              !passwordConfirmation ||
              !password ||
              password !== passwordConfirmation
            }
          >
            Register
          </Button>
        </Container>

        <Container mt={10}>
          <Button onPress={navigateToLogin}>Login</Button>
        </Container>
      </Container>
    </Flexbox>
  );
};
export default Register;
