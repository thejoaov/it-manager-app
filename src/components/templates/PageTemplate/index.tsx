import Flexbox from '@components/atoms/Flexbox';
import React, { PropsWithChildren } from 'react';
import { Appbar } from 'react-native-paper';
import { PageTemplateContainer } from './styles';

export type PageTemplateProps = {
  onBackPress: () => void;
  aditionalActions?: React.ReactNode;
  title?: string;
  testID?: string;
};

const PageTemplate: React.FC<PropsWithChildren<PageTemplateProps>> = ({
  onBackPress,
  children,
  title,
  aditionalActions,
  testID = 'page-template-container',
}) => {
  return (
    <PageTemplateContainer testID={testID}>
      <Appbar.Header testID="page-header">
        <Appbar.BackAction
          onPress={onBackPress}
          testID="page-header-backbutton"
        />
        <Appbar.Content title={title} testID="page-header-title" />
        {aditionalActions}
      </Appbar.Header>
      <Flexbox p={10} testID="page-body">
        {children}
      </Flexbox>
    </PageTemplateContainer>
  );
};

export default PageTemplate;
