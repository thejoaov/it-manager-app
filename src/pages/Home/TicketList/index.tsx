import React from "react";
import { Button, Text } from "react-native-paper";
// import { useAuthContext } from "@contexts/auth";
import Container from "@components/atoms/Container";
import { AppStackScreenProps } from "@routes/types";

const TicketList: React.FC<AppStackScreenProps<"TicketList">> = () => {
  // const { user, logout } = useAuthContext();

  return (
    <Container flex={1} justifyContent="center" p={20} testID="ticketList">
      <Text variant="bodyMedium">TicketList</Text>
    </Container>
  );
};

export default TicketList;
