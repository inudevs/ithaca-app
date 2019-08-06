import React from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View
} from 'react-native';

const win = Dimensions.get('window');
const highlightColor = '#339AF0';
const styles = StyleSheet.create({
  button: {
    // position: 'absolute',
    // bottom: 63,
    width: win.width,
    backgroundColor: highlightColor,
    zIndex: 1,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
  },
  text: {
    color: 'white',
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 20,
    lineHeight: 20 * 1.4,
  }
});

const FlatButton = ({ onPress, text, style }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={onPress}
  >
    <Text style={styles.text}>
      {text}
    </Text>
  </TouchableOpacity>
);

export default FlatButton;
