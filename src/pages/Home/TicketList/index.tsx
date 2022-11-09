import React from "react";
import { Text } from "react-native-paper";
import { AppStackScreenProps } from "@routes/types";
import Flexbox from "@components/atoms/Flexbox";

const TicketList: React.FC<AppStackScreenProps<"TicketList">> = () => {
  return (
    <Flexbox p={20} testID="ticketList">
      <Text>TicketList</Text>
    </Flexbox>
  );
};

export default TicketList;
