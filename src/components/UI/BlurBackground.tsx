import React from 'react';
import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import { BlurView } from '@react-native-community/blur';
import { StyleSheet } from 'react-native';

export const BlurBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
}) => (
  <BlurView
    blurType={'ultraThinMaterialDark'}
    blurAmount={0}
    style={[style, styles.wrapper]}
  />
);

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 24,
  },
});
