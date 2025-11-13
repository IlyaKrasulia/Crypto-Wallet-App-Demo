import { StyleSheet } from 'react-native';
import { Colors, Fonts } from 'utils/styles';

export const stackStyles = StyleSheet.create({
  headerStyle: {
    height: 56,
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
  },
  headerTitleStyle: {
    fontSize: 24,
    fontFamily: Fonts.regular,
    fontWeight: '400',
    color: Colors.White,
  },
});
