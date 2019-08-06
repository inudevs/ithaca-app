/**
 * MyPage
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Navbar from '../components/Navbar';
import moment from '../time.js';

const win = Dimensions.get('window');

const highlightColor = '#339AF0';
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
  profileimage: {
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
  },
  question: {
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'space-between',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 2,
  },
  questionLast: {
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  eye: {
    width: 18,
    height: 9,
  },
  nontitle: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: '#E2E2E2',
    marginLeft: 5,
  },
  title: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 20,
    lineHeight: 25 * 1.4,
    color: 'black',
  },
  ongoing: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: 'red',
    marginLeft: 5,
  },
  complete: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: highlightColor,
    marginLeft: 5,
  },
  quesimage: {
    height: 90,
    width: 90,
    alignSelf: 'center',
    borderColor: '#E2E2E2',
    borderWidth: 2,
  },
  ques: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 3,
  },
})

const exampleProfile = {
  image: require('../assets/examples/profile.png'),
  name: '여준호',
  school: '한국디지털미디어고등학교',
  question: [
    {
      image: require('../assets/examples/math.png'),
      title: '이 문제의 풀이과정을 잘 모르겠습니다.',
      views: 30,
      answers: 3,
      state: '진행중',
      timestamp: 1564975538,
    },
    {
      image: require('../assets/examples/english.png'),
      title: '이게 무슨문제죠...?',
      views: 10,
      answers: 1,
      state: '답변 완료',
      timestamp: 1564550000,
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
    const { questions } = this.state;
    return (
      <View style = {styles.container}>
        <View style = {styles.profile}>
          <Image
            source={require('../assets/examples/profile.png')}
            resizeMode="cover"
            style={styles.profileimage}
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
              <TouchableOpacity key={idx}>
                <View
                  style={[(idx === questions.length - 1) ? styles.questionLast: styles.question ]}
                >
                  <View style={{flex: 3, justifyContent: 'center', margin: 5}}>
                    <View style={styles.ques}>
                      <Text style={{
                        fontFamily: 'NotoSansCJKkr-Regular',
                        fontSize: 15,
                        lineHeight: 15 * 1.4,
                        color: '#E2E2E2',
                      }}>
                        {moment.unix(item.timestamp).format('YY.DD.MM')}
                      </Text>
                      <Text style={(item.state === '진행중') ? styles.ongoing : styles.complete}>
                        {item.state}
                      </Text>
                    </View>
                    <Text style={styles.title}>
                      {item.title}
                    </Text>
                    <View style={styles.ques}>
                      <Image
                        source={require('../assets/icons/eye.png')}
                        style={styles.eye}
                      /> 
                      <Text style={styles.nontitle}>
                        {item.views} 
                      </Text>
                      <Text style={styles.nontitle}>
                        답변 {item.answers}
                      </Text>
                    </View>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center', margin: 5}}>
                    <Image
                      source={item.image}
                      style={styles.quesimage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <Navbar current={routeName} />
      </View>
    )
  }
}

export default MyPage;