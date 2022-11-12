import React from 'react';
import { Text } from 'react-native-paper';

import { AppStackScreenProps } from '@routes/types';
import Flexbox from '@components/atoms/Flexbox';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC<AppStackScreenProps<'Dashboard'>> = () => {
  const { t } = useTranslation('dashboard');

  return (
    <Flexbox p={20} testID="dashboard">
      <Text>{t('title')}</Text>
    </Flexbox>
  );
};
export default Dashboard;
