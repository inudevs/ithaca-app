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
import DefaultHeader from './components/DefaultHeader';

const defaultNavigationOptions = (title) => ({
  header: props => <DefaultHeader title={title} {...props} />
})

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: defaultNavigationOptions('로그인'),
    },
    Join: {
      screen: JoinScreen,
      navigationOptions: defaultNavigationOptions('회원가입'),
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: defaultNavigationOptions('질문 목록'),
    },
  },
  {
    initialRouteName: 'Home',
    // transitionConfig: () => ({
    //   transitionSpec: {
    //     duration: 0,
    //     timing: Animated.timing,
    //     easing: Easing.step0,
    //   },
    // }),
  }
);

const App = createAppContainer(AppNavigator);
AppRegistry.registerComponent(appName, () => App);
