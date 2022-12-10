import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {
  space,
  layout,
  flexbox,
  backgroundColor,
  borders,
} from 'styled-system';
import { PageProps } from './index';

export const PageStyled = styled(View)<PageProps>`
  ${space};
  ${layout};
  ${flexbox};
  ${backgroundColor};
  ${borders};
`;

export const SafePageStyled = styled(SafeAreaView)<PageProps>`
  ${space};
  ${layout};
  ${flexbox};
  ${backgroundColor};
  ${borders};
`;
