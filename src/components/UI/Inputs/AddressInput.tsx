import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from 'utils/styles';
import { typography } from 'utils/typography';
import { TextInput } from 'react-native-gesture-handler';
import { InputProps } from './types';

export const AddressInput = ({
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
  onPressIcon,
//   rightElemStyle,
}: InputProps) => {
  const marginStyles = { marginTop, marginBottom, marginLeft, marginRight };

  return (
    <View style={[styles.inputWrapper, marginStyles]}>
      <TextInput
        onChangeText={(e) => {
          onChangeText(e);
        }}
        defaultValue={defaultValue}
        placeholder={placeholder}
        keyboardType={keyboardType}
        // onFocus={onFocusHandler}
        // onBlur={onBlurHandler}
        placeholderTextColor={Colors.LightGray}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={4}
        editable={editable}
        style={styles.input}
      />
      <TouchableOpacity style={styles.rightIcon} onPress={onPressIcon}>{rightElem}</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
  },
  input: {
    borderRadius: 20,
    paddingVertical: 23,
    paddingHorizontal: 16,
    backgroundColor: Colors.InputBg,
    color: Colors.White,

    ...typography.s2,
  },
  rightIcon: {
    position: 'absolute',
    top: 22,
    right: 16,
  },
});
