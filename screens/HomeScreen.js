/**
 * HomeScreen
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import API from '../api.js';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

export default HomeScreen;
