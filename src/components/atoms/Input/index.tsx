import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { TextInput as RNTextInput } from "react-native";
import { TextInput, TextInputProps, Theme } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export type InputProps = {
  theme?: Partial<Theme>;
  showSecureButton?: boolean;
} & Omit<TextInputProps, "theme">;

export type InputRefProps = RNTextInput;

const Input: React.ForwardRefRenderFunction<unknown, InputProps> = (
  { showSecureButton = false, ...props },
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

  const getRigthIcon = useMemo((): IconSource => {
    if (showSecureButton) {
      return securePassword ? "eye-off" : "eye";
    }
    return "";
  }, [securePassword, showSecureButton]);

  return (
    <TextInput
      testID="input-outlined"
      mode="outlined"
      ref={inputRef}
      {...props}
      secureTextEntry={securePassword}
      right={
        showSecureButton && (
          <TextInput.Icon
            icon={getRigthIcon}
            onPress={handlePasswordVisibility}
          />
        )
      }
    />
  );
};

export default forwardRef(Input);
