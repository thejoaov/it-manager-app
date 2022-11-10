import React from 'react';
import { TicketCardContainer } from './styles';

export type TicketCardProps = {
  // text?: string;
};

const TicketCard: React.FC<TicketCardProps> = () => {
  return (
    <TicketCardContainer testID="ticketCard-container">
      {/* TicketCard component */}
    </TicketCardContainer>
  );
};

export default TicketCard;
