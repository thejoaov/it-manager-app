/* eslint-disable import/extensions */
import React from 'react';
import { getLocale } from '@i18n';
import { DatePickerInput } from 'react-native-paper-dates';
import { DatePickerInputProps } from 'react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared';
import { DateInputContainer } from './styles';

export type DateInputProps = {
  // text?: string;
  label: string;
} & Omit<DatePickerInputProps, 'locale' | 'label'>;

const DateInput: React.FC<DateInputProps> = ({ ...props }) => {
  const locale = getLocale();
  return (
    <DateInputContainer testID="dateInput-container">
      <DatePickerInput {...props} locale={locale} />
    </DateInputContainer>
  );
};

export default DateInput;
