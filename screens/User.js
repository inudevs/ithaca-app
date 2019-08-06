/**
 * MyPage
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
  Image,
  TouchableOpacity,
  Button
} from 'react-native';
import Navbar from '../components/Navbar';

const win = Dimensions.get('window');

const highlightColor = '#339AF0';
const primaryColor = '#228BE6';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    height: (win.height * 0.15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    marginHorizontal: 40,
  },
  image: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    borderRadius: 60,
    borderColor: '#E2E2E2',
    borderWidth: 2,
  },
  spec: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  spec1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end', 
  },
  spec2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  name: {
    fontFamily: 'NotoSansCJKkr-Bold',
    lineHeight: 35 * 1.4,
    fontSize: 35,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  school: {
    fontFamily: 'NotoSansCJKkr-Regular',
    lineHeight: 15 * 1.4,
    fontSize: 15,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  navi: {
    marginTop: 60,
    height: (win.height * 0.05),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#E2E2E2',
    borderTopWidth: 2,
  },
  navibutton1: {
    flex: 1,
    borderBottomColor: highlightColor,
    borderBottomWidth: 2,
  },
  navibutton2: {
    flex: 1,
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 2,
  },
  navifont: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 15,
    textAlign: 'center',
  }
})

const exampleProfile = {
  image: require('../assets/examples/profile.png'),
  name: '여준호',
  school: '한국디지털미디어고등학교',
  question: [
    {
      image: '../assets/examples/math.png',
      title: '이 문제의 풀이과정을 잘 모르겠습니다.',
      view: 30,
      answer: 3,
    },
    {
      image: '../assets/examples/english.png',
      title: '이게 무슨문제죠...?',
      view: 10,
      answer: 1,
    },
  ],
}

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: exampleProfile,
      questions: exampleProfile.question,
    }
  }

  render(){
    const { navigation: { state: { routeName } } } = this.props;
    return (
      <View style = {styles.container}>
        <View style = {styles.profile}>
          <Image
            source={require('../assets/examples/profile.png')}
            resizeMode="cover"
            style={styles.image}
          />
          <View style = {styles.spec}>
            <View style = {styles.spec1}>
              <Text style = {styles.name}>
                {this.state.profile.name}
              </Text>
            </View>
            <View style = {styles.spec2}>
              <Text style = {styles.school}>
                {this.state.profile.school}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.navi}>
          <TouchableOpacity style={styles.navibutton1}>
            <Text style={styles.navifont}>멘토</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navibutton2}>
            <Text style={styles.navifont}>멘티</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View>
            {questions.map((item, idx) => (
              
            ))}
          </View>
        </ScrollView>
        <Navbar current={routeName} />
      </View>
    )
  }
}

export default MyPage;