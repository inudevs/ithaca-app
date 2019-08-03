/**
 * LoginScreen
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import API from '../api.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    API.post('/auth/login', { email, password })
      .then((res) => {
        Alert.alert(
          'Success', JSON.stringify(res.data)
        );
      })
      .catch((error) => {
        Alert.alert(
          'Failed', JSON.stringify(error.response.data)
        )
      })
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>LOGIN</Text>
        <TextInput
          editable={true}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          autoCompleteType={"email"}
        />
        <TextInput
          secureTextEntry={true}
          editable={true}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          autoCompleteType={"password"}
        />
        <TouchableOpacity
          onPress={this.onSubmit}
        >
          <Text>로그인</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginScreen;
