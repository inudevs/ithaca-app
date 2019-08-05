import React from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View
} from 'react-native';

const primaryColor = '#228BE6';
const styles = StyleSheet.create({
  button: {
    backgroundColor: primaryColor,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 15,
  },
  text: {
    fontFamily: 'NotoSansCJKkr-Regular',
    color: 'white',
    fontSize: 15,
    lineHeight: 15 * 1.4,
  },
});

const ApplyButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
  >
    <Text style={styles.text}>
      멘토링 신청
    </Text>
  </TouchableOpacity>
);

export default ApplyButton;
