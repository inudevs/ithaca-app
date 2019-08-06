import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { withNavigation } from 'react-navigation';

const highlightColor = '#339AF0';
const primaryColor = '#228BE6';
const styles = StyleSheet.create({
  
});

const Link = ({ navigation, routeName, text }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate(routeName)}
  >
    <Text style = {styles.join}>
      { text }
    </Text>
  </TouchableOpacity>
);

export default withNavigation(Link);
