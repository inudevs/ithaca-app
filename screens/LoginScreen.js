/**
 * LoginScreen
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Dimensions,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button
} from 'react-native';
import API from '../api.js';
import TextboxInput from '../components/TextboxInput';
import Link from '../components/Link';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

const win = Dimensions.get('window');

const highlightColor = '#339AF0';
const primaryColor = '#228BE6';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    height: (win.width*0.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  font: {
    fontFamily: "NotoSansCJKkr",
    // fontWeight: "300",
    // fontStyle: "normal",
    // lineHeight: 6.3,
    // letterSpacing: 0,
    // textAlign: "left",
    color: highlightColor,
    alignSelf: 'center',
  },
  font2: {
    fontFamily: "NotoSansCJKkr",
    // fontWeight: "300",
    // fontStyle: "normal",
    // lineHeight: 6.3,
    // letterSpacing: 0,
    // textAlign: "left",
    color: 'white',
    alignSelf: 'center',
  },
  placeholder: {
    fontFamily: "NotoSansCJKkr",
    fontSize: 5,
    fontWeight: "300",
    fontStyle: "normal",
    lineHeight: 7.3,
    letterSpacing: 0,
    textAlign: "left",
    color: "#afafaf"
  },
  login: {
    width: win.width,
    height: 50,
    backgroundColor: highlightColor,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
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
        <View style={styles.content}>
          <TextboxInput
            value={this.state.email}
            type={'email'}
            onChangeText={(email) => this.setState({email})}
            placeholder="ID"
          />
        </View>
        <View style={styles.content}>
          <TextboxInput
            value={this.state.password}
            type={'password'}
            onChangeText={(password) => this.setState({password})}
            placeholder="PW"
          />
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Join')}
          style={styles.content}
        >
          <Text style = {styles.font}>
            회원가입
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onSubmit}
          style={styles.login}
        >
          <Text style={styles.font2}>로그인</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginScreen;

/*<TouchableOpacity
          onPress={this.onSubmit}
          style={styles.login}
        >
          <Text style={styles.font}>로그인</Text>
        </TouchableOpacity>
*/