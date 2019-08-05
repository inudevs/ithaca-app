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
    position: 'absolute',
    right: 20,
    bottom: 80,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    height: 70,
    width: 70,
    backgroundColor: primaryColor,
    elevation: 3,
  },
  icon: {
    height: 32,
    width: 48,
    flexWrap: 'wrap',
    marginTop: 5,
  },
});

const FilterButton = ({ onPress }) => (
  <TouchableOpacity
    style={[styles.button, styles.content]}
    onPress={onPress}
  >
    <Image
      style={styles.icon}
      resizeMode="contain"
      source={require('../assets/icons/filter.png')}
    />
  </TouchableOpacity>
);

export default FilterButton;
