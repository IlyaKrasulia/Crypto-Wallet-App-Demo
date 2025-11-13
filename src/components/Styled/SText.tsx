import React from 'react';
import {Text, TextStyle} from 'react-native';
import {Colors} from 'utils/styles';
import {typography} from 'utils/typography';

type TextAlignType = TextStyle['textAlign'];
// type FontWeightType = TextStyle['fontWeight'];
type AlignSelfType = TextStyle['alignSelf'];
// type TextTransformType = TextStyle['textTransform'];
type TextDecorationType = TextStyle['textDecorationLine'];

interface IProps {
  color?: string;
  fontSize?: number;
  marginTop?: number;
  marginBottom?: number;
  marginStart?: number;
  marginEnd?: number;
  // fontWeight?: FontWeightType;
  textAlign?: TextAlignType;
  textDecoration?: TextDecorationType;
  alignSelf?: AlignSelfType;
  // textTransform?: TextTransformType;
  opacity?: number;
  letterSpacing?: number;
  lineHeight?: number;
  type?:
    | 'h1'
    | 'h2'
    | 'h2Medium'
    | 'h3'
    | 'h3Bold'
    | 'h4'
    | 'h4Bold'
    | 'subtitle'
    | 'subtitle2'
    | 'b1'
    | 'b1Bold'
    | 'b1Medium'
    | 'b2'
    | 'b2Bold'
    | 'b2Medium'
    | 't1Bold'
    | 't1'
    | 's1'
    | 's2'
    | 's3'
  children: React.ReactNode;
  numberOfLines?: number;
  lineBreakMode?: 'tail' | 'clip' | 'middle' | 'head';
}

export const SText = ({
  type,
  color = Colors.Black,
  fontSize = 14,
  marginTop = 0,
  marginBottom = 0,
  marginStart = 0,
  marginEnd = 0,
  textAlign = 'left',
  textDecoration = 'none',
  alignSelf = 'auto',
  opacity = 1,
  letterSpacing = 0.2,
  children,
  lineBreakMode,
  numberOfLines,
  lineHeight,
}: IProps) => (
    <Text
      style={[
        type
          ? {
              ...typography[type],
            }
          : {
              letterSpacing,
              fontSize,
            },
        {
          color,
          marginTop,
          marginBottom,
          marginStart,
          marginEnd,
          textAlign,
          alignSelf,
          opacity,
          textDecorationLine: textDecoration,
        },
        lineHeight ? {lineHeight} : {},
      ]}
      lineBreakMode={lineBreakMode}
      numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
