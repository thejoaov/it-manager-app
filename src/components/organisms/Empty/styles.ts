import styled from 'styled-components/native';
import { View, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';

export const EmptyContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: ${Dimensions.get('window').height / 3}px;
  width: 100%;
`;

export const EmptyText = styled(Text)`
  font-size: 24px;
  color: #666;
  margin-top: 20px;
`;
