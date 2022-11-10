import React, { useCallback, useEffect, useState } from 'react';
import { AppStackScreenProps } from '@routes/types';
import Flexbox from '@components/atoms/Flexbox';
import TicketListTemplate from '@components/templates/TicketListTemplate';
import { useRequestTickets } from '@hooks/useTickets';
import { AnimatedFAB } from 'react-native-paper';
import Container from '@components/atoms/Container';

const TicketList: React.FC<AppStackScreenProps<'TicketList'>> = () => {
  const { loading, getAllOpenTickets, meta, error, tickets } =
    useRequestTickets();
  const [isExtended, setIsExtended] = useState(true);

  useEffect(() => {
    getAllOpenTickets();
  }, [getAllOpenTickets]);

  const handlePress = useCallback(() => {
    setIsExtended(!isExtended);
    if (isExtended) {
      // TODO: Add new ticket
      console.log('Add new ticket');
    }
  }, [isExtended]);

  return (
    <Flexbox p={20} testID="ticketList">
      <TicketListTemplate
        error={error}
        loading={loading}
        meta={meta}
        tickets={tickets}
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
