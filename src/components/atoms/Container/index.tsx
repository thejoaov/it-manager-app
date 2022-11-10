import React from "react";
import { ViewProps } from "react-native";

import {
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  BackgroundColorProps,
  BordersProps,
  PositionProps,
} from "styled-system";

import { ContainerStyled } from "./styles";

export type ContainerProps = {
  centralize?: boolean;
  as?: React.ElementType;
} & SpaceProps &
  LayoutProps &
  FlexboxProps &
  BackgroundColorProps &
  BordersProps &
  PositionProps &
  ViewProps;

function Container({ centralize = false, ...otherProps }: ContainerProps) {
  return <ContainerStyled centralize={centralize} {...otherProps} />;
}

export default Container;
