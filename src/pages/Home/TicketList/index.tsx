import React, { useCallback, useState } from 'react';
import { AppStackScreenProps } from '@routes/types';
import Flexbox from '@components/atoms/Flexbox';
import TicketListTemplate from '@components/templates/TicketListTemplate';
import { AnimatedFAB } from 'react-native-paper';
import Container from '@components/atoms/Container';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ticket } from '@models/tickets';
import useRequest from '@hooks/useRequest';
import apiService from '@services/api';
import Loading from '@components/organisms/Loading';
import { useTranslation } from 'react-i18next';

const TicketList: React.FC<AppStackScreenProps<'TicketList'>> = () => {
  const { error, loading, request, response, meta } = useRequest<Ticket[]>();
  const navigation = useNavigation();
  const { t } = useTranslation('ticketlist');

  const [isExtended, setIsExtended] = useState(true);

  useFocusEffect(
    useCallback(() => {
      request(apiService.getTickets());
    }, [request])
  );

  const handlePress = useCallback(() => {
    setIsExtended(!isExtended);
    if (isExtended) {
      navigation.navigate('NewTicket');
    }
  }, [isExtended, navigation]);

  return loading ? (
    <Loading />
  ) : (
    <Flexbox p={20} testID="ticket-list">
      <TicketListTemplate
        error={error}
        loading={loading}
        meta={meta}
        tickets={response}
      />

      <Container position="absolute" bottom={90} right={160}>
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
