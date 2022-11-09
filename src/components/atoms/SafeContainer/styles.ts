import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import {
  space,
  layout,
  flexbox,
  backgroundColor,
  borders,
} from "styled-system";

export const SafeContainerStyled = styled(SafeAreaView)<{
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
`;
