import React, { useCallback, useState } from 'react';
import { AppStackScreenProps } from '@routes/types';
import TicketListTemplate from '@components/templates/TicketListTemplate';
import { Appbar, FAB } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useRequest from '@hooks/useRequest';
import apiService from '@services/api';
import Loading from '@components/organisms/Loading';
import { useTranslation } from 'react-i18next';
import { ResponseGetTickets } from '@services/api/types';
import { useToastContext } from '@contexts/toast';
import Page from '@components/atoms/Page';
import Container from '@components/atoms/Container';

const TicketList: React.FC<AppStackScreenProps<'TicketList'>> = () => {
  const { error, loading, request, response, meta } = useRequest<
    ResponseGetTickets,
    ResponseGetTickets['meta']
  >();
  const navigation = useNavigation();
  const { t } = useTranslation('ticketlist');
  const { showToast } = useToastContext();

  const [isExtended, setIsExtended] = useState(false);

  const requestTickets = useCallback(async () => {
    try {
      await request(apiService.getTickets());
    } catch (err) {
      showToast({
        text: t('errors.default'),
        type: 'error',
      });
    }
  }, [request, showToast, t]);

  useFocusEffect(
    useCallback(() => {
      requestTickets();
    }, [requestTickets])
  );

  const handlePress = useCallback(() => {
    setIsExtended(!isExtended);
    if (isExtended) {
      navigation.navigate('Ticket', {
        type: 'new',
      });
    }
  }, [isExtended, navigation]);

  return (
    <Page testID="ticket-list">
      <Appbar.Header mode="small">
        <Appbar.Content title={t('title')} />
        {/* <Appbar.Action icon="magnify" />
        <Appbar.Action icon="filter-outline" /> */}
        {/* <Appbar.Action icon="plus" onPress={handlePress} mode="outlined" /> */}
      </Appbar.Header>

      {loading ? (
        <Loading />
      ) : (
        <TicketListTemplate
          error={error}
          loading={loading}
          meta={meta as ResponseGetTickets['meta']}
          tickets={Array.from(response?.data ?? [])}
          onRefresh={requestTickets}
        />
      )}
      <Container position="absolute" bottom={20} right={20}>
        <FAB icon="plus" onPress={handlePress} />
      </Container>
    </Page>
  );
};

export default TicketList;
