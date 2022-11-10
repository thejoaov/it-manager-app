import { Ticket } from '@models/tickets';
import { RequestWithPagination } from '@services/api/types';
import React from 'react';
import { FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { TicketListTemplateContainer } from './styles';

export type TicketListTemplateProps = {
  tickets: Ticket[];
  loading: boolean;
  error: Error | null;
  meta: RequestWithPagination<unknown> | null;
};

const TicketListTemplate: React.FC<TicketListTemplateProps> = ({
  loading,
  tickets,
}) => {
  return (
    <TicketListTemplateContainer testID="ticketListTemplate-container">
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </TicketListTemplateContainer>
  );
};

export default TicketListTemplate;
