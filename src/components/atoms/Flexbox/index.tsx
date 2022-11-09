import React from "react";
import { ViewProps } from "react-native";

import {
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  BackgroundColorProps,
  BordersProps,
} from "styled-system";

import { FlexboxStyled } from "./styles";

export type FlexboxContainerProps = {
  as?: React.ElementType;
} & SpaceProps &
  LayoutProps &
  FlexboxProps &
  BackgroundColorProps &
  BordersProps &
  ViewProps;

function Flexbox({ flex = 1, ...otherProps }: FlexboxContainerProps) {
  return <FlexboxStyled flex={flex} {...otherProps} />;
}

export default Flexbox;
