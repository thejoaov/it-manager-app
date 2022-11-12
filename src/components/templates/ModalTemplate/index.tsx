import Flexbox from '@components/atoms/Flexbox';
import React, { PropsWithChildren } from 'react';
import { Appbar } from 'react-native-paper';
import { ModalTemplateContainer } from './styles';

export type ModalTemplateProps = {
  onBackPress: () => void;
  aditionalActions?: React.ReactNode;
  title?: string;
};

const ModalTemplate: React.FC<PropsWithChildren<ModalTemplateProps>> = ({
  onBackPress,
  children,
  title,
  aditionalActions,
}) => {
  return (
    <ModalTemplateContainer testID="modal-template-container">
      <Appbar.Header testID="modal-appbar">
        <Appbar.BackAction
          onPress={onBackPress}
          testID="modal-appbar-backbutton"
        />
        <Appbar.Content title={title} testID="modal-appbar-title" />
        {aditionalActions}
      </Appbar.Header>
      <Flexbox p={10} testID="modal-body">
        {children}
      </Flexbox>
    </ModalTemplateContainer>
  );
};

export default ModalTemplate;
