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
  TouchableOpacity,
} from 'react-native';
import API from '../api.js';
import TextboxInput from '../components/TextboxInput';
import Link from '../components/Link';

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
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit (event) {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const { data } = await API.post('/auth/login', { email, password });
      Alert.alert(
        'Success', JSON.stringify(data)
      );
      await AsyncStorage.setItem('token', data.token);
      // 토큰을 저장
      this.props.navigation.navigate('home');
      // 홈으로
    } catch (error) {
      Alert.alert(
        '로그인 실패', JSON.stringify(error.response.data)
      );
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>LOGIN</Text>
        <TextboxInput
          value={this.state.email}
          type={'email'}
          onChangeText={(email) => this.setState({email})}
          placeholder="이메일"
        />
        <TextboxInput
          value={this.state.password}
          type={'password'}
          onChangeText={(password) => this.setState({password})}
          placeholder="패스워드"
        />
        <TouchableOpacity
          onPress={this.onSubmit}
        >
          <Text>로그인</Text>
        </TouchableOpacity>
        <Link
          routeName="Join"
          text="회원가입"
        />
      </View>
    );
  }
}

export default LoginScreen;
