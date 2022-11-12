import React from 'react';
import { FlatList } from 'react-native';
import TicketCard from '@components/molecules/TicketCard';
import { ApiError } from '@models/errors';
import { Ticket } from '@models/tickets';
import { ResponseWithPagination } from '@services/api/types';
import { TicketListTemplateContainer } from './styles';
import Empty from '@components/organisms/Empty';
import { useTranslation } from 'react-i18next';

export type TicketListTemplateProps = {
  tickets: Ticket[];
  loading: boolean;
  error?: Error | ApiError | null;
  meta?: ResponseWithPagination<Ticket[]> | null;
};

const TicketListTemplate: React.FC<TicketListTemplateProps> = ({
  loading,
  tickets,
}) => {
  const { t } = useTranslation('ticketlist');
  return (
    <TicketListTemplateContainer testID="ticketListTemplate-container">
      <FlatList
        data={tickets}
        ListEmptyComponent={<Empty text={t('emptyText')} />}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        renderItem={({ item }) => <TicketCard item={item} />}
      />
    </TicketListTemplateContainer>
  );
};

export default TicketListTemplate;
