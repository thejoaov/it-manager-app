import React from "react";
import { useAuthContext } from "@contexts/auth";
import Container from "@components/atoms/Container";
import { Button, Text } from "react-native-paper";
import { AppStackScreenProps } from "@routes/types";

const Dashboard: React.FC<AppStackScreenProps<"Dashboard">> = () => {
  const { user, logout } = useAuthContext();

  return (
    <Container flex={1} p={20} testID="dashboard">
      <Text>Dashboard</Text>
    </Container>
  );
};
export default Dashboard;
