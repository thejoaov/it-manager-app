import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTheme from '@hooks/useTheme';
import React from 'react';

import { EmptyContainer, EmptyText } from './styles';

export type EmptyProps = {
  text: string;
};

const Empty: React.FC<EmptyProps> = ({ text }) => {
  const { colors } = useTheme();
  return (
    <EmptyContainer testID="empty-container">
      <MaterialCommunityIcons
        name="close-circle-outline"
        size={200}
        color={colors.backdrop}
        testID="empty-icon"
      />
      <EmptyText testID="empty-text">{text}</EmptyText>
    </EmptyContainer>
  );
};

export default Empty;
