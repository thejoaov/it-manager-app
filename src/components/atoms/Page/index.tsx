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

import { PageStyled, SafePageStyled } from './styles';

export type PageProps = {
  as?: React.ElementType;
  safe?: boolean;
} & SpaceProps &
  LayoutProps &
  FlexboxProps &
  BackgroundColorProps &
  BordersProps &
  ViewProps;

const Page: React.FC<PropsWithChildren<PageProps>> = ({
  flex = 1,
  backgroundColor,
  safe,
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

  return safe ? (
    <SafePageStyled flex={1}>
      <PageStyled
        flex={flex}
        backgroundColor={getBackgroundColor}
        {...otherProps}
      />
    </SafePageStyled>
  ) : (
    <PageStyled
      flex={flex}
      backgroundColor={getBackgroundColor}
      {...otherProps}
    />
  );
};

export default Page;
