import { View } from 'react-native';
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
