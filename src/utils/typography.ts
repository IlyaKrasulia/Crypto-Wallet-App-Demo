import { StyleSheet } from 'react-native';
import { Fonts } from './styles';

export const typography = StyleSheet.create({
  h1: {
    fontSize: 36,
    lineHeight: 45,
    letterSpacing: 0.01,
    fontFamily: Fonts.bold,
  },
  h2: {
    fontSize: 28,
    lineHeight: 40,
    letterSpacing: -0.02,
    fontFamily: Fonts.bold,
  },
  h2Medium: {
    fontSize: 28,
    lineHeight: 40,
    letterSpacing: -0.02,
    fontFamily: Fonts.regular,
  },
  h3: {
    fontSize: 24,
    lineHeight: 40,
    fontFamily: Fonts.regular,
  },
  h3Bold: {
    fontSize: 24,
    lineHeight: 40,
    fontFamily: Fonts.bold,
  },
  h4: {
    fontSize: 20,
    fontFamily: Fonts.regular,
  },
  h4Bold: {
    fontSize: 20,
    fontFamily: Fonts.bold,
  },
  subtitle: {
    fontSize: 24,
    lineHeight: 34,
    letterSpacing: -0.02,
    fontFamily: Fonts.bold,
  },
  subtitle2: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.02,
    fontFamily: Fonts.bold,
  },
  b1: {
    fontSize: 16,
    lineHeight: 23,
    letterSpacing: -0.02,
    fontFamily: Fonts.regular,
    fontWeight: 400,
  },
  b1Medium: {
    fontSize: 16,
    lineHeight: 23,
    letterSpacing: -0.02,
    fontFamily: Fonts.regular,
  },
  b1Bold: {
    fontSize: 16,
    lineHeight: 23,
    letterSpacing: -0.02,
    fontFamily: Fonts.bold,
  },
  b2: {
    fontSize: 14,
    lineHeight: 15,
    letterSpacing: -0.02,
    fontFamily: Fonts.regular,
  },
  b2Medium: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.02,
    fontFamily: Fonts.regular,
  },
  b2Bold: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.02,
    fontFamily: Fonts.bold,
  },
  t1Bold: {
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: -0.02,
    fontFamily: Fonts.bold,
  },
  t1: {
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: -0.02,
    fontFamily: Fonts.regular,
  },
  s1: {
    fontSize: 20,
    fontFamily: Fonts.satoshiRegular,
  },
  s2: {
    fontSize: 16,
    fontFamily: Fonts.satoshiRegular,
  },
  s3: {
    fontSize: 14,
    fontFamily: Fonts.satoshiRegular,
  },
});
