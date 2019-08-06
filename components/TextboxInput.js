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
    height: 50,
    width: (win.width * 0.8),
    paddingHorizontal: 20,
    alignSelf: 'center',
  }
});

const TextboxInput = ({ value, type, onChangeText, placeholder }) => (
  <TextInput
    secureTextEntry={(type === 'password')}
    editable={true}
    onChangeText={onChangeText}
    value={value}
    autoCompleteType={type}
    style={styles.textbox}
    inputProps={{style: { fontSize: 20, }}}
    placeholder={placeholder}
  />
);

export default TextboxInput;
