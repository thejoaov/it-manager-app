import React from "react";
import { useAuthContext } from "@contexts/auth";
import Container from "@components/atoms/Container";
import { Button, Text } from "react-native-paper";
import { AppStackScreenProps } from "@routes/types";

const Dashboard: React.FC<AppStackScreenProps<"Dashboard">> = () => {
  const { user, logout } = useAuthContext();

  return (
    <Container flex={1} justifyContent="center" p={20} testID="dashboard">
      <Text variant="bodyMedium">{user?.username}</Text>
      <Text variant="bodyMedium">{user?.profile?.name}</Text>
      <Text variant="bodyMedium">{user?.email}</Text>
      <Text variant="bodyMedium">{user?.profile?.role}</Text>
      <Button mode="contained-tonal" onPress={logout}>
        Logout
      </Button>
    </Container>
  );
};
export default Dashboard;
