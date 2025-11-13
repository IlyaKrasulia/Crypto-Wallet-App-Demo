import React, { FunctionComponent } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import BackIcon from 'assets/icons/arrow-left.svg';

const BackImage: FunctionComponent = () => (
  <View style={styles.container}>
    <BackIcon width={24} height={24} />
  </View>
);

export default BackImage;

const styles = StyleSheet.create({
  container: {
    marginLeft: Platform.OS === 'ios' ? 16 : 0,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 999,
  },
});
