import React, { useCallback, useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { AppStackScreenProps } from "@routes/types";
import Flexbox from "@components/atoms/Flexbox";
import TicketListTemplate from "@components/templates/TicketListTemplate";
import { Ticket } from "@models/tickets";
import { useRequestTickets } from "@hooks/useTickets";

const TicketList: React.FC<AppStackScreenProps<"TicketList">> = () => {
  const { loading, getAllOpenTickets, meta, error, tickets } =
    useRequestTickets();

  useEffect(() => {
    getAllOpenTickets();
  }, []);

  return (
    <Flexbox p={20} testID="ticketList">
      <TicketListTemplate
        error={error}
        loading={loading}
        meta={meta}
        tickets={tickets}
      />
    </Flexbox>
  );
};

export default TicketList;
