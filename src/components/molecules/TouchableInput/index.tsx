import Input, { InputProps } from '@components/atoms/Input';
import { TouchableInputContainer } from './styles';
import React from 'react';
import { IconName } from '@utils/icons';
import { TextInput } from 'react-native-paper';

export type TouchableInputProps = {
  onPress: () => void;
  leftIcon?: IconName;
  rightIcon?: IconName;
} & InputProps;

const TouchableInput: React.FC<TouchableInputProps> = ({
  onPress,
  leftIcon,
  rightIcon,
  left,
  right,
  ...props
}) => {
  return (
    <TouchableInputContainer
      testID="TouchableInput-container"
      onPress={onPress}
      disabled={props.disabled}
      activeOpacity={0.5}
    >
      <Input
        {...props}
        onPressIn={onPress}
        left={leftIcon ? <TextInput.Icon icon={leftIcon} /> : left}
        right={rightIcon ? <TextInput.Icon icon={rightIcon} /> : right}
      />
    </TouchableInputContainer>
  );
};

export default TouchableInput;
