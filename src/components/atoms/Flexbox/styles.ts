import { View } from 'react-native';
import styled from 'styled-components/native';
import {
  space,
  layout,
  flexbox,
  backgroundColor,
  borders,
} from 'styled-system';

export const FlexboxStyled = styled(View)`
  ${space};
  ${layout};
  ${flexbox};
  ${backgroundColor};
  ${borders};
`;
