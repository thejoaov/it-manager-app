import React from 'react';
import { FlatList } from 'react-native';
import TicketCard from '@components/molecules/TicketCard';
import { ApiError } from '@models/errors';
import { Ticket } from '@models/tickets';
import { ResponseWithPagination } from '@services/api/types';
import { TicketListTemplateContainer } from './styles';

export type TicketListTemplateProps = {
  tickets: Ticket[] | null;
  loading: boolean;
  error?: Error | ApiError | null;
  meta?: ResponseWithPagination<Ticket[]> | null;
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
        renderItem={({ item }) => <TicketCard item={item} />}
      />
    </TicketListTemplateContainer>
  );
};

export default TicketListTemplate;
