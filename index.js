/**
 * @format
 */

// import React from 'react';
import { AppRegistry, /* Animated, Easing */ } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import { name as appName } from './app.json';
import {
  LoginScreen,
} from './screens';

// const defaultNavigationOptions = () => ({
//   header: props => <DefaultHeader {...props} />
// })

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    //   navigationOptions: defaultNavigationOptions
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
