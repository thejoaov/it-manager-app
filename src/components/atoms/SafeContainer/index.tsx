import React from "react";
import { ViewProps } from "react-native";

import {
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  BackgroundColorProps,
  BordersProps,
} from "styled-system";

import { SafeContainerStyled } from "./styles";

export type SafeContainerProps = {
  centralize?: boolean;
  as?: React.ElementType;
} & SpaceProps &
  LayoutProps &
  FlexboxProps &
  BackgroundColorProps &
  BordersProps &
  ViewProps;

function SafeContainer({
  centralize = false,
  flex = 1,
  ...otherProps
}: SafeContainerProps) {
  return (
    <SafeContainerStyled flex={flex} centralize={centralize} {...otherProps} />
  );
}

export default SafeContainer;
