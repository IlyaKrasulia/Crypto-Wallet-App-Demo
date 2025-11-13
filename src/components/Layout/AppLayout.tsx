import React, { useMemo } from 'react';
import {
  StatusBar,
  SafeAreaView,
  ColorValue,
  StatusBarStyle,
  StyleProp,
  ViewStyle,
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {
  STATUS_BAR_BACKGROUND,
  STATUS_BAR_STYLE,
  baseStyle,
} from 'utils/styles';
import BG from '@assets/images/bg.png';

interface IProps {
  children: React.ReactNode;
  backgroundColor?: ColorValue;
  barStyle?: StatusBarStyle;
  screenBackgroundColor?: ColorValue;
  screenViewStyle?: StyleProp<ViewStyle>;
}

export const AppLayout = ({
  children,
  backgroundColor,
  barStyle = 'light-content',
  screenBackgroundColor,
  screenViewStyle,
}: IProps) => {
  const BackgroundColor = useMemo(
    () => backgroundColor || STATUS_BAR_BACKGROUND,
    [backgroundColor],
  );

  const BarStyle = useMemo(() => barStyle || STATUS_BAR_STYLE, [barStyle]);

  return (
    <View style={styles.flexContainer}>
      <StatusBar
        backgroundColor={BackgroundColor}
        barStyle={BarStyle}
        translucent={true}
      />
      <View style={styles.relativeFlexContainer}>
        <ImageBackground source={BG} style={styles.imageBackground} />

        <SafeAreaView
          style={[
            styles.flexContainer,
            baseStyle.screenView,
            screenBackgroundColor
              ? { backgroundColor: screenBackgroundColor }
              : {},
            screenViewStyle,
          ]}
        >
          {children}
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  relativeFlexContainer: {
    flex: 1,
    position: 'relative',
  },
  imageBackground: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
