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
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Picker,
  Image,
} from 'react-native';

import API from '../api.js';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker'

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
  },
  choosePhoto: {
    backgroundColor: primaryColor,
    width: (win.width * 0.4),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  choosePhotoText: {
    color: '#fff',
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
  noPic: {
    color: '#000',
    fontFamily: 'NotoSansCJKkr-Bold',
    fontSize: 20,
    lineHeight: 20 * 1.4,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  photo: {
    width: 300,
    height: 300,
    borderColor: '#AAA',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    position: 'absolute',
    bottom: 0,
  }
});

const subjects = ['국어', '영어', '수학', '사회', '과학', '역사', '기타'];

class WriteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '수학',
      photo: null,
      title: '',
      article: '',
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
  }

  async onSubmit () {
    Alert.alert('질문 등록', '질문을 등록했습니다!')
    this.props.navigation.navigate('Home')
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

  render() {
    const { photo } = this.state;
    return (
      <ScrollView style={[styles.container]} contentContainerStyle={{minHeight:(win.height*0.92)}}>
        <View>
          {(() => {
            if (photo) {
              return <Image
                source={{ uri: photo.uri }}
                style={styles.photo}
              />;
            } else {
              return <Text style={styles.noPic}>사진 없음</Text>;
            }
          })()}
          <TouchableOpacity
            onPress={this.handleChoosePhoto}
            style={styles.choosePhoto}
          >
            <Text style={styles.choosePhotoText}>사진 업로드</Text>
          </TouchableOpacity>
        </View>        
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.helpTop}>
            {'아래는 인공지능 모델이 예측한 카테고리입니다.'}
          </Text>
          <Text style={styles.helpBottom}>
            아니라면, 직접 선택하세요!
          </Text>
        </View>
        <Picker
          selectedValue={this.state.category}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({category: itemValue})
          }>
          {subjects.map((item, idx) => {
            return <Picker.Item label={item} value={item} key={idx} />;
          })}
        </Picker>
        <TextboxInput
          placeholder="제목"
          value={this.state.title}
          onChangeText={(title) => this.setState({ title })}
        />
        <TextareaInput
          placeholder="내용"
          value={this.state.article}
          onChangeText={(article) => this.setState({ article })}
        />
        <FlatButton
          text="확인"
          onPress={() => this.onSubmit()}
          style={styles.button}
        />
      </ScrollView>
    );
  }
}

export default WriteScreen;
