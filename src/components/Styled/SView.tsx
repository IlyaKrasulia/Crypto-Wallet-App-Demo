import React from 'react';
import { View, ViewProps } from 'react-native';

interface IProps extends ViewProps {
  children?: React.ReactNode;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  flex?: number;
}

export const SView = ({
  children,
  marginLeft = 0,
  marginRight = 0,
  marginTop = 0,
  marginBottom = 0,
  paddingLeft = 0,
  paddingRight = 0,
  paddingTop = 0,
  paddingBottom = 0,
  flex,
}: IProps) => (
  <View
    style={{
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      flex,
    }}
  >
    {children}
  </View>
);
