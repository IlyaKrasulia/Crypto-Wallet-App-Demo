import React, { useState, useCallback } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { SButton } from 'components/Styled/SButton';
import SearchIcon from '@assets/icons/search.svg';
import { Colors } from 'utils/styles';
import { typography } from 'utils/typography';

interface IProps {
  onPress: () => void;
  defaultValue: string;
  onChangeText: (text: string) => void;
}

export const SearchInput = ({
  onPress,
  defaultValue,
  onChangeText,
}: IProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputWidth = useSharedValue(0);

  const toggleInput = useCallback(() => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    inputWidth.value = withTiming(newState ? 130 : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  }, [isExpanded, inputWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: inputWidth.value,
  }));

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.inputWrapper, animatedStyle]}>
        <TextInput
          onChangeText={(text) => onChangeText(text)}
          placeholder={'Search'}
          defaultValue={defaultValue}
          style={styles.input}
          placeholderTextColor={Colors.Gray}
        />
      </Animated.View>
      <SButton
        onPress={() => {
          toggleInput();
          onPress();
        }}
        styleBtn={styles.buttonWrapper}
      >
        <SearchIcon />
      </SButton>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  buttonWrapper: {
    width: 36,
    height: 36,
    backgroundColor: Colors.InputBg,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  inputWrapper: {
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: Colors.InputBg,
    position: 'absolute',
    right: 0,
  },
  input: {
    paddingLeft: 16,
    paddingVertical: 8,
    ...typography.b2Medium,
    flex: 1,
    color: Colors.White,
  },
});
