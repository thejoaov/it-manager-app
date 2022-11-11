import React from 'react';
import { Text } from 'react-native-paper';
// import { useAuthContext } from "@contexts/auth";
import Flexbox from '@components/atoms/Flexbox';
import { AppStackScreenProps } from '@routes/types';
import useRequest from '@hooks/useRequest';
// import apiService from '@services/api';
import { Ticket } from '@models/tickets';

const NewTicket: React.FC<AppStackScreenProps<'NewTicket'>> = () => {
  const {} = useRequest<Ticket>();

  return (
    <Flexbox p={20} testID="newTicket">
      <Text variant="bodyMedium">NewTicket</Text>
    </Flexbox>
  );
};

export default NewTicket;
