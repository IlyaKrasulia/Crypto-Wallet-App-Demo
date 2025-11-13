import React from 'react';
import { StatusBar, View, ImageBackground, StyleSheet } from 'react-native';
import BG from '@assets/images/bg.png';

interface IProps {
  children: React.ReactNode;
}

export const AppBackground = ({ children }: IProps) => (
  <View style={styles.container}>
    <StatusBar
      barStyle={'light-content'}
      translucent={true}
    />

    <ImageBackground source={BG} style={StyleSheet.absoluteFill} />

    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
