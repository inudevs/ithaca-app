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
      name: '',
      school: '',
      grade: '',
      klass: '',
      photo: 'https://via.placeholder.com/128',
      email: '',
      password: ''
    }
  }

  async onSubmit (event) {
    event.preventDefault();
    const { name, school, grade, klass, photo, email, password } = this.state;
    try {
      const { data } = await API.post('/auth/join', { name, school, grade, klass, photo, email, password });
      Alert.alert(
        'Success', JSON.stringify(data)
      );
      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      if (error.response.status_code === 400){
        Alert.alert('잘못된 요청');
      } else {
        Alert.alert('에러')
      }
    };
  };

  render() {
    return (
      <View style={styles.container}>
        {['name', 'school', 'grade', 'klass', 'email', 'password'].map((key) => { 
          return <TextInput
              secureTextEntry={key == 'password'}
              editable={true}
              onChangeText={(text) => this.setState({text})}
              value={this.state.key}
              autoCompleteType={key}
              style={styles.textbox}
              inputProps={{style: { fontSize: 20, }}}
              placeholder={key}
            />
          }
        )}
        <TouchableOpacity
          onPress={this.onSubmit}
        >
          <Text>회원가입</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

/* <TextInput
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
*/

export default JoinScreen;
