import {
  ColorValue,
  Dimensions,
  StatusBarStyle,
  StyleSheet,
} from 'react-native';

// Dimensions
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

// StatusBar
export const STATUS_BAR_BACKGROUND: ColorValue = 'transparent';
export const STATUS_BAR_STYLE: StatusBarStyle = 'dark-content';

// BaseStyle
export const baseStyle = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
});

export enum Colors {
  Primary = '#1D8EF8',
  PrimaryLight = '#45D7FF',
  PrimaryBg = '#E9FBF3',
  PrimaryOpacity = '#32C1FFB2',
  BG = '#FAFAFD',
  ScreenBg = '#FAFAFF',
  InputBg = '#FFFFFF1A',
  White = '#fff',
  Black = '#121313',
  Gray = '#AAAAAA',
  LighterGray = '#F6F6F633',
  LightGray = '#F6F6F6',
  Error = '#E02244',
  Warning = '#F9CE35',
  Green = '#B8FF62',
  Red = '#FF4747',
  transparent = 'transparent',
}

export enum Fonts {
  'regular' = 'Sansation-Regular',
  'bold' = 'Sansation-Bold',
  'boldItalic' = 'Sansation-BoldItalic',
  'mediumItalic' = 'Sansation-MediumItalic',
  'satoshiRegular' = 'Satoshi-Regular',
}

