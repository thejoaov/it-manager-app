import React, { PropsWithChildren } from 'react';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

import {
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  BackgroundColorProps,
  BordersProps,
} from 'styled-system';

import { SafeContainerStyled } from './styles';

export type SafeContainerProps = {
  centralize?: boolean;
  as?: React.ElementType;
} & SpaceProps &
  LayoutProps &
  FlexboxProps &
  BackgroundColorProps &
  BordersProps &
  SafeAreaViewProps;

const SafeContainer: React.FC<PropsWithChildren<SafeContainerProps>> = ({
  centralize = false,
  flex = 1,
  ...otherProps
}) => {
  return (
    <SafeContainerStyled
      flex={flex}
      centralize={centralize}
      {...otherProps}
      edges={['top', 'left', 'right']}
    />
  );
};

export default SafeContainer;
