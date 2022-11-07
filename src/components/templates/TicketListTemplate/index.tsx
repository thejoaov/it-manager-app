import React from "react";
import { TicketListTemplateContainer } from "./styles";

export type TicketListTemplateProps = {
  // text?: string;
};

const TicketListTemplate: React.FC<TicketListTemplateProps> = () => {
  return (
    <TicketListTemplateContainer testID="ticketListTemplate-container">
      {/* TicketListTemplate component */}
    </TicketListTemplateContainer>
  );
};

export default TicketListTemplate;
