/**
 * WriteScreen
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
  Keyboard,
  Picker,
} from 'react-native';

import API from '../api.js';
import AsyncStorage from '@react-native-community/async-storage';
import TextboxInput from '../components/TextboxInput';
import TextareaInput from '../components/TextareaInput';
import SchoolSearch from '../components/SchoolSearch';
import FlatButton from '../components/FlatButton';

const win = Dimensions.get('window');

const primaryColor = '#228BE6';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    width: (win.width * 0.9),
    alignSelf: 'center',
    backgroundColor: '#e9ecef',
    marginBottom: 10,
  },
  helpTop: {
    marginHorizontal: 20,
    marginTop: 10,
    fontFamily: 'NotoSansCJKkr-Bold',
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
  helpBottom: {
    marginBottom: 10,
    fontFamily: 'NotoSansCJKkr-Bold',
    fontSize: 17,
    lineHeight: 17 * 1.4,
    color: primaryColor,
  }
});

const subjects = ['국어', '영어', '수학', '사회', '과학', '역사', '기타'];

class WriteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
  }r

  async onSubmit () {
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <TextboxInput
          placeholder="카테고리"
        /> */}
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.helpTop}>
            {'아래는 인공지능 모델이 예측한 카테고리입니다.'}
          </Text>
          <Text style={styles.helpBottom}>
            아니라면, 직접 선택하세요!
          </Text>
        </View>
        <Picker
          selectedValue={this.state.language}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({language: itemValue})
          }>
          {subjects.map((item, idx) => {
            return <Picker.Item label={item} value={item} key={idx} />;
          })}
        </Picker>
        <TextboxInput
          placeholder="제목"
        />
        <TextareaInput
          placeholder="내용"
        />
      </View>
    );
  }
}

export default WriteScreen;
