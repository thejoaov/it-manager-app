import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {
  space,
  layout,
  flexbox,
  backgroundColor,
  borders,
} from 'styled-system';
import { SafeContainerProps } from '.';

export const SafeContainerStyled = styled(SafeAreaView)<SafeContainerProps>`
  ${({ centralize }) =>
    centralize &&
    `
  align-items: center;
  justify-content: center;
  `}

  ${space};
  ${layout};
  ${flexbox};
  ${backgroundColor};
  ${borders};
`;
