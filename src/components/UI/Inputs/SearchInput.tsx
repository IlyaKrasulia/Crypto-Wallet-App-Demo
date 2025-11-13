import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { typography } from 'utils/typography';
import { Colors } from 'utils/styles';
import SearchIcon from '@assets/icons/search.svg';
import { InputProps } from './types';

export const SearchInput = ({
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
  rightElemStyle,
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
        style={styles.input}
        placeholderTextColor={Colors.LightGray}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={4}
        editable={editable}
      />
      <View style={[styles.leftIcon, rightElemStyle]}>
        <SearchIcon />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
  },
  input: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: Colors.InputBg,
    color: Colors.Gray,
    ...typography.s3,
  },
  leftIcon: {
    position: 'absolute',
    height: 42,
    width: 42,
    top: 5,
    right: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.InputBg,
    borderColor: Colors.LighterGray,
  },
});
