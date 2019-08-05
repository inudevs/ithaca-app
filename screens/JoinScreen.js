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
import TextboxInput from '../components/TextboxInput';

const win = Dimensions.get('window');

const fields = [
  { 
    name: 'email',
    placeholder: '이메일',
    autoCompleteType: 'email',
  },
  {
    name: 'password',
    placeholder: '패스워드',
    autoCompleteType: 'password',
  },
  {
    name: 'name',
    placeholder: '이름',
    autoCompleteType: 'name',
  }, 
  {
    name: 'school',
    placeholder: '학교',
    autoCompleteType: 'off',
  },
  {
    name: 'grade',
    placeholder: '학년',
    autoCompleteType: 'off',
  },
  {
    name: 'klass', 
    placeholder: '반',
    autoCompleteType: 'off',
  },
  { 
    name: 'number',
    placeholder: '번호',
    autoCompleteType: 'email',
  },
];

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
      number: '',
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
        {fields.map((key, idx) => { 
          return (<TextboxInput
              onChangeText={(text) => this.setState({[key.name]: text})}
              type={key.autoCompleteType}
              value={this.state[key.name]}
              placeholder={key.placeholder}
              key={idx}
            />)
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
