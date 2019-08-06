/**
 * LoginScreen
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
import AsyncStorage from '@react-native-community/async-storage';

import API from '../api.js';
import TextboxInput from '../components/TextboxInput';
import FlatButton from '../components/FlatButton';

const win = Dimensions.get('window');

const highlightColor = '#339AF0';
const primaryColor = '#228BE6';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    marginTop: 22,
  },
  help: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 20,
    lineHeight: 20 * 1.4,
    marginBottom: 22,
    color: primaryColor,
    alignSelf: 'center',
  },
  submit: {
    position: 'absolute',
    bottom: 0,
  },
  toJoin: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  toJoinFont: {
    fontFamily: 'NotoSansCJKkr-Bold',
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: primaryColor,
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

  async componentDidMount () {
    // 토큰 체크
    try {
      const value = await AsyncStorage.getItem('token')
      if(value !== null) {
        this.props.navigation.navigate('Home')
        // 토큰이 있음 -> 홈으로 가라
      }
    } catch(e) {
      // 토큰이 없음
    }
  }

  async onSubmit () {
    const { email, password } = this.state;
    if (!email || !password) {
      Alert.alert('로그인 실패!', '이메일과 패스워드 모두 입력해 주세요.');
      return;
    }
    try {
      const { data } = await API.post('/auth/login', { email, password });
      // Alert.alert('로그인 성공', JSON.stringify(data));
      await AsyncStorage.setItem('token', data.token);
      // 토큰을 저장
    } catch (error) {
      Alert.alert('로그인 실패', '이메일과 비밀번호를 확인해 주세요.');
      return;
    };
    this.props.navigation.navigate('Home');
    // 홈으로
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.help}>
            이타카 계정에 로그인하세요.
          </Text>
          <TextboxInput
            value={this.state.email}
            type="email"
            onChangeText={(email) => this.setState({email})}
            placeholder="이메일"
          />
          <TextboxInput
            value={this.state.password}
            type="password"
            onChangeText={(password) => this.setState({password})}
            placeholder="패스워드"
          />
        </View>
        <TouchableOpacity
          style={styles.toJoin}
          onPress={() => this.props.navigation.navigate('Join')}
        >
          <Text style = {styles.toJoinFont}>
            계정이 없나요? 회원가입
          </Text>
        </TouchableOpacity>
        <FlatButton
          text="로그인"
          onPress={this.onSubmit}
          style={styles.submit}
        />
      </View>
    );
  }
}

export default LoginScreen;
