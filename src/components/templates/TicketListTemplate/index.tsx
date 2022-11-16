import React from 'react';
import { Dimensions, FlatList, useColorScheme } from 'react-native';
import TicketCard from '@components/molecules/TicketCard';
import { ApiError } from '@models/errors';
import { TicketFull } from '@models/tickets';
import { ResponseGetTickets } from '@services/api/types';
import { TicketListTemplateContainer } from './styles';
import Empty from '@components/organisms/Empty';
import { useTranslation } from 'react-i18next';
import { Appbar } from 'react-native-paper';
import Flexbox from '@components/atoms/Flexbox';
import useTheme from '@hooks/useTheme';

export type TicketListTemplateProps = {
  tickets: TicketFull[];
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
  const theme = useTheme();
  const colorScheme = useColorScheme();

  return (
    <TicketListTemplateContainer
      testID="ticketListTemplate-container"
      theme={theme}
      isDark={colorScheme === 'dark'}
    >
      <Appbar.Header>
        <Appbar.Content title={t('title')} />
      </Appbar.Header>

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
        renderItem={({ item }) => <TicketCard item={item} />}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ paddingHorizontal: 10 }}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
      />
    </TicketListTemplateContainer>
  );
};

export default TicketListTemplate;
