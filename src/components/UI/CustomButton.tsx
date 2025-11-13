import { SText } from 'components/Styled/SText';
import React, { ReactNode } from 'react';
import { StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';
import { Colors } from 'utils/styles';
import { SFlex } from 'components/Styled/SFlex';
import { Loader } from './Loader';

interface IProps {
  text: string;
  btnStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  background?: string;
  textColor?: string;
  marginTop?: number;
  marginBottom?: number;
  rightIcon?: ReactNode;
}

export const CustomButton = ({
  text,
  background = Colors.Primary,
  onPress,
  disabled,
  textColor = Colors.White,
  btnStyle,
  marginTop = 0,
  marginBottom = 0,
  loading,
  rightIcon,
}: IProps) => (
  <Pressable
    style={({ pressed }) => [
      styles.btn,
      {
        backgroundColor: background,
        opacity: pressed || disabled ? 0.5 : 1,
        marginTop,
        marginBottom,
      },
      btnStyle || undefined,
    ]}
    disabled={disabled || loading}
    onPress={onPress}
  >
    {loading ? (
      <Loader color={Colors.Black} />
    ) : (
      <SFlex alignItems={'center'} gap={10}>
        <SText type={'b1Medium'} color={textColor}>
          {text}
        </SText>
        {rightIcon && rightIcon}
      </SFlex>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  btn: {
    height: 62,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
