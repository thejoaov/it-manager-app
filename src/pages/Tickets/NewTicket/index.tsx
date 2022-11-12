import React from 'react';
import { Text } from 'react-native-paper';
import { AppStackScreenProps } from '@routes/types';
// import useRequest from '@hooks/useRequest';
// import { Ticket } from '@models/tickets';
import ModalTemplate from '@components/templates/ModalTemplate';

const NewTicket: React.FC<AppStackScreenProps<'NewTicket'>> = ({
  navigation,
}) => {
  // const {} = useRequest<Ticket>();

  return (
    <ModalTemplate title="New ticket" onBackPress={navigation.goBack}>
      <Text variant="bodyMedium">NewTicket</Text>
    </ModalTemplate>
  );
};

export default NewTicket;
