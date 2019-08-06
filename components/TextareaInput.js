import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
} from 'react-native';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  textbox: {
    backgroundColor: '#e9ecef',
    width: (win.width * 0.9),
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 25,
  },
  input: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 18,
    lineHeight: 18 * 1.4,
    // paddingTop: 0,
    // paddingBottom: 0,
  }
});

const TextAreaInput = ({ value, onChangeText, placeholder }) => (
  <TextInput
    editable={true}
    onChangeText={onChangeText}
    value={value}
    style={[styles.textbox, styles.input]}
    inputProps={styles.input}
    placeholder={placeholder}
    numberOfLines={5}
    multiline={true}
  />
);

export default TextAreaInput;
