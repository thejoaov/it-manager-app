import { View } from "react-native";
import styled from "styled-components/native";
import {
  space,
  layout,
  flexbox,
  backgroundColor,
  borders,
  position,
} from "styled-system";

export const ContainerStyled = styled(View)<{
  centralize?: boolean;
}>`
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
  ${position};
`;
