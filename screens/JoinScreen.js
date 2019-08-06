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
  Keyboard,
} from 'react-native';

import API from '../api.js';
import TextboxInput from '../components/TextboxInput';
import SchoolSearch from '../components/SchoolSearch';
import FlatButton from '../components/FlatButton';

const win = Dimensions.get('window');

const fields = [
  [
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
  ],
  [
    {
      name: 'name',
      placeholder: '이름',
      autoCompleteType: 'name',
    },
    {
      name: 'phone',
      placeholder: '전화번호',
      autoCompleteType: 'tel',
    },
    {
      name: 'birth',
      placeholder: '생년월일',
      autoCompleteType: 'off',
    },
  ],
  [], // 학교는 따로 받음
  [
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
  ],
];

const primaryColor = '#228BE6';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepDesc: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 20,
  },
  stepNum: {
    fontFamily: 'NotoSansCJKkr-Bold',
    fontSize: 20,
    lineHeight: 20 * 1.4,
    marginBottom: 0,
    color: primaryColor,
  },
  stepHelp: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: primaryColor,
  },
  nextButton: {
    position: 'absolute',
    bottom: 0,
  },
  textbox: {
    backgroundColor: '#e9ecef',
    height: 55,
    width: (win.width * 0.9),
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  input: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 18,
    lineHeight: 18 * 1.4,
    paddingTop: 0,
    paddingBottom: 0,
  },
  completeWrap: {
    marginTop: (win.height * 0.25),
    alignItems: 'center',
  },
  complete: {
    fontFamily: 'NotoSansCJKkr-Bold',
    fontSize: 24,
    lineHeight: 24 * 1.4,
    color: 'black',
  },
  completeNext: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: 'black',
    marginTop: 10,
  },
  toLogin: {
    backgroundColor: primaryColor,
    width: (win.width * 0.4),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 50,
  },
  toLoginText: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: 'white',
  },
});

class JoinScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0, // 회원가입 단계 (0부터)
      email: '',
      password: '',
      name: '',
      phone: '',
      birth: '',
      school: '',
      schoolSelected: false,
      schoolEnd: false,
      grade: '',
      klass: '',
      number: '',
      photo: 'https://via.placeholder.com/128',
    }

    this.onPressNext = this.onPressNext.bind(this);
  }

  async onSubmit () {
    const { email, password, name, phone, birth, school, grade, klass, number, photo } = this.state;
    const payload = { email, password, name, phone, birth, school, grade, klass, number, photo };
    try {
      // const { data } = await API.post('/auth/join', payload);
      await API.post('/auth/join', payload);
      return true;
    } catch (error) {
      // if (error.response.status_code === 400){
      //   Alert.alert('잘못된 요청');
      // } else {
      //   Alert.alert('에러')
      // }
      Alert.alert('로그인 실패!', '로그인 중 에러가 발생했습니다.');
      return false;
    };
  };

  async onPressNext () {
    const { step } = this.state;
    if (step === 2) {
      const { school, schoolSelected } = this.state;
      if (!school || !schoolSelected) {
        return Alert.alert('잠깐!', '올바른 학교 이름인지 확인해 주세요.');
      }
    } else if (step === 3) { // 여기서 제출!
      const res = await this.onSubmit()
      if (!res) return; // 성공 못하면 보류
      Keyboard.dismiss()
    }
    this.setState((prev) => {
      return { step: prev.step + 1 }
    });
  }

  render() {
    const { step } = this.state;
    return (
      <View style={styles.container}>
        {(() => {
          if (step === 0) { // 1단계
            return (<View>
              <View style={styles.stepDesc}>
                <Text style={styles.stepNum}>{step + 1}/{fields.length}</Text>
                <Text style={styles.stepHelp}>이메일과 비밀번호를 입력해주세요.</Text>
              </View>
              {fields[step].map((key, idx) => { 
                return (<TextboxInput
                    onChangeText={(text) => this.setState({[key.name]: text})}
                    type={key.autoCompleteType}
                    value={this.state[key.name]}
                    placeholder={key.placeholder}
                    key={idx}
                  />)
                }
              )}
            </View>)
          } else if (step === 1) { // 2단계
            return (<View>
              <View style={styles.stepDesc}>
                <Text style={styles.stepNum}>{step + 1}/{fields.length}</Text>
                <Text style={styles.stepHelp}>개인정보를 입력해주세요.</Text>
              </View>
              {fields[step].map((key, idx) => { 
                return (<TextboxInput
                    onChangeText={(text) => this.setState({[key.name]: text})}
                    type={key.autoCompleteType}
                    value={this.state[key.name]}
                    placeholder={key.placeholder}
                    key={idx}
                  />)
                }
              )}           
            </View>)
          } else if (step === 2) { // 3단계
            return (<View>
              <View style={styles.stepDesc}>
                <Text style={styles.stepNum}>{step + 1}/{fields.length}</Text>
                <Text style={styles.stepHelp}>학교를 선택해주세요.</Text>
              </View>
              <SchoolSearch
                value={this.state.school}
                selected={this.state.schoolSelected}
                onChangeValue={(school) => this.setState({ school })}
                onChangeSelected={(schoolSelected) => this.setState({ schoolSelected })}
                placeholder="학교 이름을 검색하세요"
              />
            </View>)
          } else if (step === 3) { // 4단계
            return (<View>
              <View style={styles.stepDesc}>
                <Text style={styles.stepNum}>{step + 1}/{fields.length}</Text>
                <Text style={styles.stepHelp}>학교 정보를 입력해주세요.</Text>
              </View>
              {fields[step].map((key, idx) => { 
                return (<TextboxInput
                    onChangeText={(text) => this.setState({[key.name]: text})}
                    type={key.autoCompleteType}
                    value={this.state[key.name]}
                    placeholder={key.placeholder}
                    key={idx}
                  />)
                }
              )}
            </View>)
          } else if (step === fields.length) { // 5단계
            return (<View style={styles.completeWrap}>
              <Text style={styles.complete}>가입 신청이 완료되었습니다.</Text>
              <Text style={styles.completeNext}>아래 버튼을 눌러, 로그인을 진행해주세요.</Text>
              <TouchableOpacity
                style={styles.toLogin}
                onPress={() => this.props.navigation.navigate('Login')}
              >
                <Text style={styles.toLoginText}>
                  로그인 화면으로
                </Text>
              </TouchableOpacity>
            </View>)
          }
        })()}
        {(() => {
          if (step < fields.length) {
            return <FlatButton
              text="다음으로"
              onPress={() => this.onPressNext(step)}
              style={styles.nextButton}
            />;
          }
        })()}
      </View>
    );
  }
}

export default JoinScreen;
