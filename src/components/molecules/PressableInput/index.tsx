import Input, { InputProps } from '@components/atoms/Input';
import { PressableInputContainer } from './styles';
import React from 'react';
import { IconName } from '@utils/icons';
import { TextInput } from 'react-native-paper';

export type PressableInputProps = {
  onPress: () => void;
  leftIcon?: IconName;
  rightIcon?: IconName;
} & InputProps;

const PressableInput: React.FC<PressableInputProps> = ({
  onPress,
  leftIcon,
  rightIcon,
  left,
  right,
  ...props
}) => {
  return (
    <PressableInputContainer
      testID="pressableInput-container"
      onPress={onPress}
      disabled={props.disabled}
    >
      <Input
        {...props}
        onPressIn={onPress}
        left={leftIcon ? <TextInput.Icon icon={leftIcon} /> : left}
        right={rightIcon ? <TextInput.Icon icon={rightIcon} /> : right}
      />
    </PressableInputContainer>
  );
};

export default PressableInput;
