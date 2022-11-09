import React from "react";
import { Button, Text } from "react-native-paper";

import { AppStackScreenProps } from "@routes/types";
import Flexbox from "@components/atoms/Flexbox";
import { useAuthContext } from "@contexts/auth";

const Dashboard: React.FC<AppStackScreenProps<"Dashboard">> = () => {
  const { logout } = useAuthContext();

  return (
    <Flexbox p={20} testID="dashboard">
      <Text>Dashboard</Text>
      <Button onPress={logout}>
        <Text>Logout</Text>
      </Button>
    </Flexbox>
  );
};
export default Dashboard;
