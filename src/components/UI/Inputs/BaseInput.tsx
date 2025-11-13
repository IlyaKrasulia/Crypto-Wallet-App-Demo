import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { typography } from 'utils/typography';
import { Colors } from 'utils/styles';
import { InputProps } from './types';

export const BaseInput = ({
//   errorText,
  placeholder,
  defaultValue,
  keyboardType,
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  maxLength,
  multiline,
  editable = true,
  onChangeText,
  rightElem,
  rightElemStyle,
}: InputProps) => {
  const marginStyles = { marginTop, marginBottom, marginLeft, marginRight };
  return (
    <View style={[styles.inputWrapper, marginStyles]}>
      <View style={[styles.leftIcon, rightElemStyle]}>{rightElem}</View>
      <TextInput
        onChangeText={(e) => {
          onChangeText(e);
        }}
        defaultValue={defaultValue}
        placeholder={placeholder}
        keyboardType={keyboardType}
        // onFocus={onFocusHandler}
        // onBlur={onBlurHandler}
        style={styles.input}
        placeholderTextColor={Colors.LightGray}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={4}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
  },
  input: {
    borderRadius: 50,
    paddingLeft: 46,
    paddingRight: 16,
    paddingVertical: 16,
    backgroundColor: Colors.InputBg,
    color: Colors.White,
    ...typography.h4,
  },
  leftIcon: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
});
