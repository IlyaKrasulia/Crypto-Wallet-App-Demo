import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

interface IProps {
  color: string;
}

export const Loader = ({ color }: IProps) => (
  <View style={styles.container}>
    <ActivityIndicator size={'small'} color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
