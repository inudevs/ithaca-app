/**
 * @format
 */

import React from 'react';
import { AppRegistry, /* Animated, Easing */ } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import { name as appName } from './app.json';
import {
  LoginScreen,
  JoinScreen,
  HomeScreen,
} from './screens';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: { title: '로그인' },
    },
    Join: {
      screen: JoinScreen,
      navigationOptions: { title: '회원가입' },
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: { title: '질문 목록' },
    },
  },
  {
    initialRouteName: 'Login',
    transitionConfig: () => ({
    //   transitionSpec: {
    //     duration: 0,
    //     timing: Animated.timing,
    //     easing: Easing.step0,
    //   },
    }),
  }
);

const App = createAppContainer(AppNavigator);
AppRegistry.registerComponent(appName, () => App);
