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
  QuestionView,
  ChatView,
  UserScreen,
  Alarm,
  WriteScreen,
  Mentor,
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
    Question: {
      screen: QuestionView,
      navigationOptions: defaultNavigationOptions('질문 보기'),
    },
    Chat: {
      screen: ChatView,
      // navigationOptions: defaultNavigationOptions(),
    },
    User: {
      screen: UserScreen,
      navigationOptions: defaultNavigationOptions('내 정보'),
    },
    Alarm: {
      screen: Alarm,
      navigationOptions: defaultNavigationOptions('알림'),
    },
    Write: {
      screen: WriteScreen,
      navigationOptions: defaultNavigationOptions('질문 등록'),
    },
    Mentor: {
      screen: Mentor,
      navigationOptions: defaultNavigationOptions('멘토링'),
    }
  },
  {
    initialRouteName: 'Login',
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
