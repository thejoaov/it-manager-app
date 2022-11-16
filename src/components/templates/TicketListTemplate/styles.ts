import styled from 'styled-components/native';
import { View } from 'react-native';
import { ITheme } from '@utils/theme';

export const TicketListTemplateContainer = styled(View)<{
  theme?: ITheme;
  isDark: boolean;
}>`
  flex: 1;
  background-color: ${(props) =>
    props.isDark ? '#000' : props.theme.colors.background};
`;
