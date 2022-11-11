import React, { useCallback, useEffect, useState } from 'react';
import { AppStackScreenProps } from '@routes/types';
import Flexbox from '@components/atoms/Flexbox';
import TicketListTemplate from '@components/templates/TicketListTemplate';
import { AnimatedFAB } from 'react-native-paper';
import Container from '@components/atoms/Container';
import { useNavigation } from '@react-navigation/native';
import { Ticket } from '@models/tickets';
import useRequest from '@hooks/useRequest';
import apiService from '@services/api';
import Loading from '@components/organisms/Loading';

const TicketList: React.FC<AppStackScreenProps<'TicketList'>> = () => {
  const { error, loading, request, response, meta } = useRequest<Ticket[]>();

  const [isExtended, setIsExtended] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    request(apiService.getTickets());
  }, [request]);

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

      <Container position="absolute" bottom={90} right={170}>
        <AnimatedFAB
          extended={isExtended}
          icon="plus"
          label="Create Ticket"
          onPress={handlePress}
        />
      </Container>
    </Flexbox>
  );
};

export default TicketList;
