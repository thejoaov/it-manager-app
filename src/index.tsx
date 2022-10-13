import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import api from "./services/api";

export default function App() {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleLogin = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.login({ login, password });
      setLoggedIn(true);
      console.log("response", response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      {loggedIn && <Text variant="bodyMedium">Logged in!</Text>}

      <TextInput
        mode="outlined"
        label="Login"
        placeholder="Email or Username"
        onChangeText={setLogin}
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
      />

      <TextInput
        mode="outlined"
        label="Password"
        // secureTextEntry
        onChangeText={setPassword}
        autoCapitalize="none"
        autoComplete="password"
      />

      <Button
        mode="elevated"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
      >
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
});
