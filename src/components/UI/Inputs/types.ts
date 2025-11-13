import { ReactNode } from 'react';
import { KeyboardTypeOptions, StyleProp, ViewStyle } from 'react-native';

export interface InputProps {
  errorText?: string | null;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  defaultValue?: string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  maxLength?: number;
  multiline?: boolean;
  editable?: boolean;
  onChangeText: (value: string) => void;
  onBlur?: (e: unknown) => void;
  rightElem?: ReactNode;
  rightElemStyle?: StyleProp<ViewStyle>;
  onPressIcon?: () => void;
  stakingOptonData?: {
    balance: number;
    profit: number;
    maxAmount: number;
    currency: string;
    onPressMax: () => void;
  };
}

export const onFocusHandler = () => {};

export const onBlurHandler = (onBlur: (e: unknown) => void, e: unknown) => {
  if (onBlur) {
    onBlur(e);
  }
};
