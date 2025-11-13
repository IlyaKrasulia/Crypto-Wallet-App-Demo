import { Platform, TextStyle } from 'react-native';

type FontGroup<T extends string> = Readonly<{
  [key in T]: TextStyle;
}>;

const mobile: FontGroup<
  | '28ptBold'
  | '24ptBold'
  | '20ptBold'
  | '18ptRegular'
  | '17ptSemibold'
  | '17ptBold'
  | '16ptRegular'
  | '16ptMedium'
  | '15ptBold'
  | '14ptMedium'
  | '13ptBold'
  | '13ptMedium'
> = {
  '28ptBold': {
    fontFamily: 'Inter-Bold',
    fontWeight: Platform.select({
      ios: '700',
      default: undefined,
    }),
    fontStyle: 'normal',
    fontSize: 28,
    lineHeight: 41,
  },

  '24ptBold': {
    fontFamily: 'Inter-Bold',
    fontWeight: Platform.select({
      ios: '700',
      default: undefined,
    }),
    fontStyle: 'normal',
    fontSize: 24,
    lineHeight: 32,
  },

  '20ptBold': {
    fontFamily: 'Inter-Bold',
    fontWeight: Platform.select({
      ios: '700',
      default: undefined,
    }),
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 28,
  },

  '18ptRegular': {
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.select({
      ios: '400',
      default: undefined,
    }),
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 28,
  },

  '17ptSemibold': {
    fontFamily: 'Inter-SemiBold',
    fontWeight: Platform.select({
      ios: '600',
      default: undefined,
    }),
    fontStyle: 'normal',
    fontSize: 17,
    lineHeight: 22,
  },
  '17ptBold': {
    fontFamily: 'Inter-Bold',
    fontWeight: Platform.select({
      ios: '700',
      default: undefined,
    }),
    fontStyle: 'normal',
    fontSize: 17,
    lineHeight: 22,
  },

  '16ptRegular': {
    fontFamily: 'Inter-Regular',
    fontWeight: Platform.select({
      ios: '400',
      default: undefined,
    }),
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 20,
  },
  '16ptMedium': {
    fontFamily: 'Inter-Bold',
    fontWeight: Platform.select({
      ios: '500',
      default: undefined,
    }),
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 20,
  },

  '15ptBold': {
    fontFamily: 'Inter-SemiBold',
    fontWeight: Platform.select({
      ios: '600',
      default: undefined,
    }),
    fontStyle: 'normal',
    fontSize: 15,
    lineHeight: 22,
  },

  '14ptMedium': {
    fontFamily: 'Inter-Medium',
    fontWeight: Platform.select({
      ios: '500',
      default: undefined,
    }),
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 20,
  },

  '13ptBold': {
    fontFamily: 'Inter-Bold',
    fontWeight: Platform.select({
      ios: '700',
      default: undefined,
    }),
    fontStyle: 'normal',
    fontSize: 13,
    lineHeight: 18,
  },
  '13ptMedium': {
    fontFamily: 'Inter-Medium',
    fontWeight: Platform.select({
      ios: '500',
      default: undefined,
    }),
    fontStyle: 'normal',
    fontSize: 13,
    lineHeight: 18,
  },
};

export const Fonts = Object.freeze({
  mobile,
});
