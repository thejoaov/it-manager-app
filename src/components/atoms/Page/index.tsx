import useTheme from '@hooks/useTheme';
import React, { PropsWithChildren, useMemo } from 'react';
import { useColorScheme, ViewProps } from 'react-native';

import {
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  BackgroundColorProps,
  BordersProps,
} from 'styled-system';

import { PageStyled } from './styles';

export type PageProps = {
  as?: React.ElementType;
} & SpaceProps &
  LayoutProps &
  FlexboxProps &
  BackgroundColorProps &
  BordersProps &
  ViewProps;

const Page: React.FC<PropsWithChildren<PageProps>> = ({
  flex = 1,
  backgroundColor,

  ...otherProps
}: PageProps) => {
  const { colors } = useTheme();
  const colorScheme = useColorScheme();

  const getBackgroundColor = useMemo(() => {
    if (backgroundColor) {
      return backgroundColor;
    }
    return colorScheme === 'dark' ? '#000' : colors.background;
  }, [backgroundColor, colorScheme, colors.background]);

  return (
    <PageStyled
      flex={flex}
      backgroundColor={getBackgroundColor}
      {...otherProps}
    />
  );
};

export default Page;
