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
    height: 55,
    width: (win.width * 0.9),
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  input: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 18,
    lineHeight: 18 * 1.4,
    paddingTop: 0,
    paddingBottom: 0,
  }
});

const TextboxInput = ({ value, type, onChangeText, placeholder, noMargin }) => (
  <TextInput
    secureTextEntry={(type === 'password')}
    editable={true}
    onChangeText={onChangeText}
    value={value}
    autoCompleteType={type}
    style={[styles.textbox, styles.input, 
      {marginBottom: (noMargin) ? 0 : 10}]}
    inputProps={styles.input}
    placeholder={placeholder}
  />
);

export default TextboxInput;
