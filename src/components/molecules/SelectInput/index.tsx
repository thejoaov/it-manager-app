import Input from '@components/atoms/Input';
import { IconName } from '@utils/icons';
import { ITheme } from '@utils/theme';
import React, { useState } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Menu, MenuItemProps, TextInput } from 'react-native-paper';
import { SelectInputContainer } from './styles';

export type SelectInputProps = {
  anchor?: React.ReactNode | { x: number; y: number };
  onPress?: () => void;
  values: Array<
    Omit<MenuItemProps, 'theme' | 'leadingIcon' | 'trailingIcon'> & {
      leadingIcon?: IconName;
      trailingIcon?: IconName;
      theme?: ITheme;
    }
  >;
  onDismiss?: () => void;
  inputIcon?: IconName;
  onIconPress?: () => void;
  disabled?: boolean;
  inputOnPressIn?: () => void;
  inputDisabled?: boolean;
  inputValue?: string;
  inputError?: string;
  inputLabel?: string;
  inputPlaceholder?: string;
  inputRight?: React.ReactNode;
} & TouchableOpacityProps;

const SelectInput: React.FC<SelectInputProps> = ({
  anchor,
  values,
  onDismiss,
  inputIcon,
  onIconPress,
  inputOnPressIn,
  inputDisabled,
  inputValue,
  inputError,
  inputLabel,
  inputPlaceholder,
  inputRight,
  ...props
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SelectInputContainer
      testID="selectInput-container"
      activeOpacity={0.5}
      {...props}
      onPress={() => {
        setMenuVisible(true);
        props?.onPress?.();
      }}
    >
      <Menu
        visible={menuVisible}
        onDismiss={() => {
          setMenuVisible(false);
          onDismiss?.();
        }}
        anchor={
          anchor ?? (
            <Input
              left={
                inputIcon ? (
                  <TextInput.Icon
                    icon={inputIcon}
                    onPress={() => {
                      setMenuVisible(true);
                      onIconPress?.();
                    }}
                    disabled={inputDisabled}
                  />
                ) : undefined
              }
              label={inputLabel}
              placeholder={inputPlaceholder}
              editable={false}
              disabled={inputDisabled}
              onPressIn={() => {
                setMenuVisible(true);
                inputOnPressIn?.();
              }}
              value={inputValue}
              error={inputError}
              right={inputRight}
            />
          )
        }
      >
        {values.map((item, index) => (
          <Menu.Item
            {...item}
            key={index}
            onPress={(e) => {
              item.onPress?.(e);
              setMenuVisible(false);
            }}
          />
        ))}
      </Menu>
    </SelectInputContainer>
  );
};

export default SelectInput;
