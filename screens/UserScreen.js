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
import AsyncStorage from '@react-native-community/async-storage';
import API from '../api';

import Navbar from '../components/Navbar';
import moment from '../time.js';

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
    borderTopColor: '#E2E2E2',
    borderTopWidth: 1,
    borderBottomColor: highlightColor,
    borderBottomWidth: 2,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  navibutton2: {
    flex: 1,
    borderTopColor: '#E2E2E2',
    borderTopWidth: 1,
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 2,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  navifont: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 17,
    lineHeight: 17 * 1.4,
    textAlign: 'center',
    color: 'black',
  },
  numberBadge: {
    backgroundColor: highlightColor,
    borderRadius: 10,
    marginLeft: 10,
    paddingHorizontal: 5,
  },
  numberBadgeText: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: 'white',
  },
  question: {
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'space-between',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 2,
  },
  questionLast: {
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 15,
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
    color: '#5F5F5F',
    marginLeft: 5,
  },
  answers: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: '#5F5F5F',
    marginLeft: 12,
  },
  title: {
    fontFamily: 'NotoSansCJKkr-Bold',
    fontSize: 19,
    lineHeight: 19 * 1.4,
  },
  category: {
    color: highlightColor,
  },
  status: {
    fontFamily: 'NotoSansCJKkr-Regular',
    color: primaryColor,
    fontSize: 15,
    lineHeight: 15 * 1.4,
    marginLeft: 5,
  },
  quesimage: {
    height: 80,
    width: 80,
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
  image: require('../assets/examples/juno.jpg'),
  name: '여준호',
  school: '한국디지털미디어고등학교',
}

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentorings: {},
      // mentorings: {
      //   user: exampleProfile,
      //   mentor: [],
      //   mentee: [
      //     {
      //       image: require('../assets/examples/math.png'),
      //       title: '이 문제의 풀이과정을 잘 모르겠습니다.',
      //       views: 30,
      //       answers: 3,
      //       state: 'M',
      //       timestamp: 1564975538,
      //     },
      //     {
      //       image: require('../assets/examples/english.png'),
      //       title: '이게 무슨문제죠...?',
      //       views: 10,
      //       answers: 1,
      //       state: 'C',
      //       timestamp: 1564550000,
      //     },
      //   ],
      // },
      loaded: false,
      // loaded: true,
      token: '',
      user: {},
      tab: 0,
    }
  }

  async componentDidMount() {
    if (!this.state.token) {
      let token = '';
      try {
        token = await AsyncStorage.getItem('token')
      } catch(e) {
        this.props.navigation.navigate('Login')       
      }
      try {
        const { data } = await API.get(`/mentor/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        // console.warn(data)
        this.setState({
          mentorings: data.mentorings,
          token: token,
          loaded: true,
        })
        // console.warn(this.state.mentorings)
      } catch(error) {
        // console.warn(JSON.stringify(error.response))
        if (error.response.status === 401)
          this.props.navigation.navigate('Login')
        // Alert.alert('', JSON.stringify(error.response))
      }
    }
  }

  render(){
    const { navigation: { state: { routeName } } } = this.props;
    const { mentorings, loaded, tab } = this.state;
    return (
      <View style = {styles.container}>
        {(() => {
          if (loaded) {
            return (<View style={{marginBottom: 150,}}>
              <View style = {styles.profile}>
              <Image
                source={{uri: mentorings.user.photo}}
                // source={mentorings.user.image}
                resizeMode="cover"
                style={styles.profileimage}
              />
              <View style = {styles.spec}>
                <View style = {styles.spec1}>
                  <Text style = {styles.name}>
                    {mentorings.user.name}
                  </Text>
                </View>
                <View style = {styles.spec2}>
                  <Text style = {styles.school}>
                    {mentorings.user.school}
                  </Text>
                </View>
              </View>
            </View>
              <View style={styles.navi}>
                <TouchableOpacity
                  style={styles.navibutton1}
                  onPress={() => this.setState({tab: 0})}
                >
                  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.navifont}>
                      멘토
                    </Text>
                    <View style={styles.numberBadge}>
                      <Text style={styles.numberBadgeText}>
                        { mentorings.mentor.length }
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.navibutton2}
                  onPress={() => this.setState({tab: 1})}
                >
                  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.navifont}>
                      멘티
                    </Text>
                    <View style={styles.numberBadge}>
                      <Text style={styles.numberBadgeText}>
                        { mentorings.mentee.length }
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View>
                  {(() => {
                    if (!tab) {
                      if (mentorings.mentor.length === 0) {
                        return (<Text 
                          style={{marginTop: 30, justifyContent:'center', 
                            alignSelf:'center', color: 'black',
                            fontFamily: 'NotoSansCJKkr-Bold',
                            fontSize: 18,
                            lineHeight: 18 * 1.4,}}>
                          아직 멘토로 참여한 멘토링이 없습니다!
                        </Text>);
                      }
                      return mentorings.mentor.map((item, idx) => (
                        <TouchableOpacity 
                          key={idx}
                          onPress={() => this.props.navigation.navigate('Question', {
                            questionID: item.id,
                            token: this.state.token,
                          })}
                        >
                          <View
                            style={[(idx === mentorings.mentor.length - 1) ? styles.questionLast: styles.question ]}
                          >
                            <View style={{flex: 3, justifyContent: 'center', margin: 5}}>
                              <View style={styles.ques}>
                                <Text style={{
                                  fontFamily: 'NotoSansCJKkr-Regular',
                                  fontSize: 15,
                                  lineHeight: 15 * 1.4,
                                  color: '#5F5F5F',
                                }}>
                                  {moment.unix(item.timestamp).format('YY.DD.MM')}
                                </Text>
                                <Text style={styles.status}>
                                  {(item.status=='P') ? '진행중' : '완료'}
                                </Text>
                              </View>
                              <Text style={styles.title}>
                                <Text style={styles.category}>{item.category}</Text>
                                <Text style={styles.blank}> </Text>
                                {item.title}
                              </Text>
                              <View style={styles.ques}>
                                <Image
                                  source={require('../assets/icons/eye.png')}
                                  style={styles.eye}
                                /> 
                                <Text style={styles.nontitle}>
                                  1
                                </Text>
                                <Text style={styles.answers}>
                                  답변 {item.requests}
                                </Text>
                              </View>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', margin: 5}}>
                              <Image
                                // source={{uri: item.photo}}
                                source={item.image}
                                style={styles.quesimage}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      ))
                    } else {
                      if (mentorings.mentee.length === 0) {
                        return (<Text 
                          style={{marginTop: 30, justifyContent:'center', 
                            alignSelf:'center', color: 'black',
                            fontFamily: 'NotoSansCJKkr-Bold',
                            fontSize: 18,
                            lineHeight: 18 * 1.4,}}>
                          아직 멘티로 참여한 멘토링이 없습니다!
                        </Text>);
                      }
                      return mentorings.mentee.map((item, idx) => (
                        <TouchableOpacity 
                          key={idx}
                          onPress={() => this.props.navigation.navigate('Question', {
                            questionID: item.id,
                            token: this.state.token,
                          })}
                        >
                          <View
                            style={[(idx === mentorings.mentee.length - 1) ? styles.questionLast: styles.question ]}
                          >
                            <View style={{flex: 3, justifyContent: 'center', margin: 5}}>
                              <View style={styles.ques}>
                                <Text style={{
                                  fontFamily: 'NotoSansCJKkr-Regular',
                                  fontSize: 15,
                                  lineHeight: 15 * 1.4,
                                  color: '#5F5F5F',
                                }}>
                                  {moment.unix(item.timestamp).format('YY.DD.MM')}
                                </Text>
                                <Text style={styles.status}>
                                  {(item.status=='P') ? '진행중' : '완료'}
                                </Text>
                              </View>
                              <Text style={styles.title}>
                                <Text style={styles.category}>{item.category}</Text>
                                <Text style={styles.blank}> </Text>
                                {item.title}
                              </Text>
                              <View style={styles.ques}>
                                <Image
                                  source={require('../assets/icons/eye.png')}
                                  style={styles.eye}
                                /> 
                                <Text style={styles.nontitle}>
                                  1
                                </Text>
                                <Text style={styles.answers}>
                                  답변 {item.requests}
                                </Text>
                              </View>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', margin: 5}}>
                              <Image
                                // source={{uri: item.photo}}
                                source={item.image}
                                style={styles.quesimage}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      ))
                    }
                  })()}
                </View>
              </ScrollView>
            </View>);
          } 
        })()}
        <Navbar current={routeName} />
      </View>
    )
  }
}

export default MyPage;