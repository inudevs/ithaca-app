/**
 * JoinScreen
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
  TextInput,
  TouchableOpacity,
} from 'react-native';
import API from '../api.js';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textbox: {
    backgroundColor: '#e9ecef',
    height: 50,
    borderRadius: 25,
    width: (win.width * 0.8),
    paddingHorizontal: 20,
  }
});

class JoinScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          editable={true}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          autoCompleteType={"email"}
          style={styles.textbox}
          inputProps={{style: { fontSize: 20, }}}
          placeholder="이메일"
        />
        <TextInput
          secureTextEntry={true}
          editable={true}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          autoCompleteType={"password"}
          style={styles.textbox}
          inputProps={{style: { fontSize: 20, }}}
          placeholder="패스워드"
        />
      </View>
    );
  }
}

export default JoinScreen;
