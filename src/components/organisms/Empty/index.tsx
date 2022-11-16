import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTheme from '@hooks/useTheme';
import React from 'react';

import { EmptyContainer, EmptyText } from './styles';

export type EmptyProps = {
  text: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
};

const Empty: React.FC<EmptyProps> = ({ text, icon }) => {
  const { colors } = useTheme();
  return (
    <EmptyContainer testID="empty-container">
      <MaterialCommunityIcons
        name={icon || 'emoticon-sad-outline'}
        size={100}
        color={colors.backdrop}
        testID="empty-icon"
      />
      <EmptyText testID="empty-text">{text}</EmptyText>
    </EmptyContainer>
  );
};

export default Empty;
