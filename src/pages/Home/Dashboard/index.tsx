import React from 'react';
import { Text } from 'react-native-paper';

import { AppStackScreenProps } from '@routes/types';
import Flexbox from '@components/atoms/Flexbox';

const Dashboard: React.FC<AppStackScreenProps<'Dashboard'>> = () => {
  return (
    <Flexbox p={20} testID="dashboard">
      <Text>Dashboard</Text>
    </Flexbox>
  );
};
export default Dashboard;
