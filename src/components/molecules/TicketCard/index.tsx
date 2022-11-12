import { Ticket } from '@models/tickets';
import React from 'react';
import { Text } from 'react-native-paper';
import { TicketCardContainer } from './styles';

export type TicketCardProps = {
  item: Ticket;
};

const TicketCard: React.FC<TicketCardProps> = ({ item }) => {
  return (
    <TicketCardContainer testID="ticketCard-container">
      <Text>{item.id}</Text>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>{item.location}</Text>
      <Text>{item.priority}</Text>
      <Text>{item.status}</Text>
      <Text>{item.opener_id}</Text>
      <Text>{item.assignee_id}</Text>
      <Text>{item.created_at}</Text>
    </TicketCardContainer>
  );
};

export default TicketCard;
