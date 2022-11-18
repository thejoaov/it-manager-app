import React, { useCallback, useState } from 'react';
import { AppStackScreenProps } from '@routes/types';
import Flexbox from '@components/atoms/Flexbox';
import TicketListTemplate from '@components/templates/TicketListTemplate';
import { AnimatedFAB } from 'react-native-paper';
import Container from '@components/atoms/Container';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useRequest from '@hooks/useRequest';
import apiService from '@services/api';
import Loading from '@components/organisms/Loading';
import { useTranslation } from 'react-i18next';
import { ResponseGetTickets } from '@services/api/types';
import { useToastContext } from '@contexts/toast';

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
      navigation.navigate('NewTicket');
    }
  }, [isExtended, navigation]);

  return (
    <Flexbox testID="ticket-list">
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
      <Container position="absolute" bottom={90} right={155}>
        <AnimatedFAB
          extended={isExtended}
          icon="plus"
          label={t('buttons.new')}
          onPress={handlePress}
        />
      </Container>
    </Flexbox>
  );
};

export default TicketList;
