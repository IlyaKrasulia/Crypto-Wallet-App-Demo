import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from 'utils/styles';

interface IProps {
  children: ReactNode;
  radius?: number;
  padding?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  style?: StyleProp<ViewStyle>;
}

export const BlurContainer = ({
  children,
  padding,
  paddingVertical,
  paddingHorizontal,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  radius,
  style,
}: IProps) => (
  <View
    style={[
      styles.wrapper,
      {
        padding,
        paddingVertical,
        paddingHorizontal,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        borderRadius: radius,
        ...(style as object),
      },
    ]}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    borderColor: Colors.LighterGray,
    backgroundColor: Colors.InputBg,
    borderWidth: 1,
  },
});
