import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
});

const Link = ({ navigation, routeName, text }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate(routeName)}
  >
    <Text>
      { text }
    </Text>
  </TouchableOpacity>
);

export default withNavigation(Link);
