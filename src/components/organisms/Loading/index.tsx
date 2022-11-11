import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { LoadingContainer } from './styles';

export type LoadingProps = {
  // text?: string;
};

const Loading: React.FC<LoadingProps> = () => {
  return (
    <LoadingContainer testID="loading-container">
      <ActivityIndicator size={100} />
    </LoadingContainer>
  );
};

export default Loading;
