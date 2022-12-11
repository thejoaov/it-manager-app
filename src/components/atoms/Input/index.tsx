import { IconName } from '@utils/icons';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TextInput as RNTextInput } from 'react-native';
import {
  HelperText,
  TextInput,
  TextInputProps,
  MD3Theme,
} from 'react-native-paper';

export type InputProps = {
  theme?: Partial<MD3Theme>;
  showSecureButton?: boolean;
  error?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
} & Omit<TextInputProps, 'theme' | 'error'>;

export type InputRefProps = RNTextInput;

const Input: React.ForwardRefRenderFunction<unknown, InputProps> = (
  {
    showSecureButton = false,
    error,
    leftIcon,
    rightIcon,
    left,
    right,
    ...props
  },
  ref
) => {
  const [securePassword, setSecurePassword] = useState(showSecureButton);
  const inputRef = useRef<RNTextInput | null>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef?.current?.focus();
    },
  }));

  const handlePasswordVisibility = useCallback(() => {
    setSecurePassword(!securePassword);
  }, [securePassword]);

  const getSecureIcon = useMemo((): IconName => {
    return securePassword ? 'eye-off' : 'eye';
  }, [securePassword]);

  return (
    <>
      <TextInput
        testID="input-outlined"
        mode="outlined"
        ref={inputRef}
        {...props}
        error={!!error}
        secureTextEntry={securePassword}
        left={left || (leftIcon ? <TextInput.Icon icon={leftIcon} /> : null)}
        right={
          right ||
          (showSecureButton && (
            <TextInput.Icon
              icon={getSecureIcon}
              onPress={handlePasswordVisibility}
            />
          )) ||
          (rightIcon ? <TextInput.Icon icon={rightIcon} /> : null)
        }
      />
      {error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
    </>
  );
};

export default forwardRef(Input);
