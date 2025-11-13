import React from 'react';
import {
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';

interface KeyboardAvoidingLayoutProps {
  children?: React.ReactNode;
  keyboardVerticalOffset?: number;
}

export const KeyboardAvoidingLayout = ({
  children,
  keyboardVerticalOffset = 0,
}: KeyboardAvoidingLayoutProps) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={keyboardVerticalOffset}
    style={styles.flexContainer}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});
