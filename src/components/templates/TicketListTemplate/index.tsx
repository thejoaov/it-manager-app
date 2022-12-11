import React from 'react';
import { Dimensions, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import TicketCard from '@components/molecules/TicketCard';
import { ApiError } from '@models/errors';
import { Ticket } from '@models/tickets';
import { ResponseGetTickets } from '@services/api/types';
import Empty from '@components/organisms/Empty';
import Flexbox from '@components/atoms/Flexbox';

import { TicketListTemplateContainer } from './styles';
import Container from '@components/atoms/Container';

export type TicketListTemplateProps = {
  tickets: Ticket[];
  loading: boolean;
  error?: Error | ApiError | null;
  meta?: ResponseGetTickets['meta'];
  onRefresh?: () => void;
  onEndReached?: () => void;
};

const TicketListTemplate: React.FC<TicketListTemplateProps> = ({
  loading,
  tickets,
  onRefresh,
  onEndReached,
}) => {
  const { t } = useTranslation('ticketlist');

  return (
    <TicketListTemplateContainer testID="ticketListTemplate-container">
      <FlatList
        data={tickets}
        ListEmptyComponent={
          <Flexbox
            alignItems="center"
            justifyContent="center"
            mt={Dimensions.get('screen').height / 7}
          >
            <Empty text={t('emptyText')} />
          </Flexbox>
        }
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <Container px="5px" py="2px">
            <TicketCard item={item} />
          </Container>
        )}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
      />
    </TicketListTemplateContainer>
  );
};

export default TicketListTemplate;
