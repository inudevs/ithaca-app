/**
 * QuestionView
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
} from 'react-native';

import API from '../api';
import moment from '../time.js';
import Navbar from '../components/Navbar';
import FlatButton from '../components/FlatButton';
import ApplyButton from '../components/ApplyButton';

const win = Dimensions.get('window');

const highlightColor = '#339AF0';
const primaryColor = '#228BE6';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  question: {
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 2,
  },
  title: {
    fontFamily: 'NotoSansCJKkr-Bold',
    fontSize: 25,
    lineHeight: 25 * 1.4,
    marginBottom: 5,
  },
  category: {
    color: highlightColor,
  },
  eye: {
    width: 18,
    height: 9,
  },
  views: {
    fontFamily: 'NotoSansCJKkr-Regular',
    color: '#ABABAB',
    fontSize: 15,
    lineHeight: 25 * 1.4,
  },
  meta: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  name: {
    fontFamily: 'NotoSansCJKkr-Regular',
    color: 'black',
    fontSize: 20,
    lineHeight: 20 * 1.4,
    marginRight: 5,
  },
  timestamp: {
    fontFamily: 'NotoSansCJKkr-Regular',
    color: '#5F5F5F',
    fontSize: 20,
    lineHeight: 20 * 1.4,
    marginRight: 5,
  },
  status: {
    fontFamily: 'NotoSansCJKkr-Regular',
    color: primaryColor,
    fontSize: 20,
    lineHeight: 20 * 1.4,
    marginRight: 5,
  },
  photo: {
    height: (win.height * 0.3),
    width: (win.width - 40),
    borderColor: '#AAA',
    borderWidth: 1,
  },
  article: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    marginTop: 10,
    marginBottom: 10,
  },
  footer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  requestNum: {
    fontFamily: 'NotoSansCJKkr-Bold',
    color: highlightColor,
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
  requests: {
    marginBottom: 63,
  },
  request: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  requestNotLast: {
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontFamily: 'NotoSansCJKkr-Regular',
    color: 'black',
    fontSize: 18,
    lineHeight: 18 * 1.4,
    marginLeft: 10,
  },
  profileTimestamp: {
    fontFamily: 'NotoSansCJKkr-Regular',
    color: '#5F5F5F',
    fontSize: 15,
    lineHeight: 15 * 1.4,
  },
  requestApplyWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const exampleQuestionData = {
  mine: true, // question의 작성자(멘티)가 현재 사용자의 것인가?
  id: '5d47a1b2db87e70f7aa22ef5',
  user: { name: '테스트' },
  status: 'C',
  timestamp: 1564975538,
  title: '이걸 모르겠어요',
  article: '도와주세요ㅜㅜ 진짜 알다가도 모르겠습니다',
  category: '영어',
  photo: 'https://via.placeholder.com/500x300',
  image: require('../assets/examples/english.png'),
  views: 12,
  requests: [
    {
      user: { 
        name: '송지호',
        image: require('../assets/examples/profile.png'),
      }, 
      approved: false,
      timestamp: 1564975538
    },
    {
      user: { 
        name: '백은서',
        image: require('../assets/examples/profile.png'),
      }, 
      approved: false,
      timestamp: 1564975538
    },
    {
      user: { 
        name: '우상윤',
        image: require('../assets/examples/profile.png'),
      }, 
      approved: true,
      timestamp: 1564975538
    },
    {
      user: { 
        name: '천예준',
        image: require('../assets/examples/profile.png'),
      }, 
      approved: false,
      timestamp: 1564975538
    },
  ],
}

class QuestionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
      token: '',
      loaded: false,
    };

    this.onPressApply = this.onPressApply.bind(this);
    this.onPressApprove = this.onPressApprove.bind(this);
  }

  async componentDidMount() {
    if (!this.state.token) {
      const { navigation } = this.props;
      const questionID = navigation.getParam('questionID', 'NO-ID');
      const token = navigation.getParam('token', 'NO-TOKEN');
      // try {
      //   token = await AsyncStorage.getItem('token')
      // } catch(e) {
      //   this.props.navigation.navigate('Login')       
      // }
      // console.warn(token)
      try {
        res = await API.get(`/question/${questionID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        this.setState({
          question: res.data,
          token: token,
          loaded: true,
        })
        // console.warn(this.state.question)
      } catch(error) {
        // console.warn(JSON.stringify(error.response))
      }
    }
  }

  async onPressApply () {
    const { question, token } = this.state;
    // console.warn(true)
    try {
      const { status } = await API.post(`/mentor/request/${question.id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.warn(status)
      if (status === 200) {
        Alert.alert('멘토링 신청', "멘토링 지원이 완료되었습니다.\n'멘토링' 메뉴에서 확인하실 수 있습니다.");
      }
    } catch (error) {
      // please no
      console.warn(error.response.status)
    }
  }

  async onPressApprove (requestID) {
    const { question, token } = this.state;
    await API.post(`/mentor/approve/${question.id}`, {
      request_id: requestID,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  render() {
    const { navigation: { state: { routeName } } } = this.props;
    const { question, loaded } = this.state;
    return (
      <View style={styles.container}>
        {(() => {
          if (loaded) {
            return (<ScrollView>
              <View style={styles.question}>
                <Text style={styles.title}>
                  <Text style={styles.category}>
                    {question.category}
                  </Text>
                  <Text style={styles.blank}> </Text>
                  {question.title}
                  <Text style={styles.blank}> </Text>
                  <Text style={styles.views}>
                    <Image
                      source={require('../assets/icons/eye.png')}
                      style={styles.eye}
                    /> {question.views}
                  </Text>
                </Text>
                <View style={styles.meta}>
                  <Text style={styles.name}>
                    {question.user.name}
                  </Text>
                  <Text style={styles.timestamp}>
                    {moment.unix(question.timestamp).format('YY.DD.MM')}
                  </Text>
                  <Text style={styles.status}>
                    {(question.status=='P') ? '진행중' : '완료'}
                  </Text>
                </View>
                <Image
                  source={{uri: question.photo}}
                  // source={question.image}
                  resizeMode="cover"
                  style={styles.photo}
                />
                <Text style={styles.article}>
                  {question.article}
                </Text>
                <View style={styles.footer}>
                  <Text style={styles.requestNum}>답변 {question.requests.length}</Text>
                </View>
              </View>
              <View style={styles.requests}>
                {question.requests.map((item, idx) => (
                  <View
                    style={[styles.request, (idx === question.requests.length - 1) ? 
                      {} : styles.requestNotLast]}
                    key={idx}
                  >
                    <View style={styles.profileInfo}>
                      <Image
                        source={{uri: item.user.photo}}
                        // source={item.user.image}
                        resizeMode="cover"
                        style={styles.profile}
                      />
                      <Text style={styles.profileName}>
                        { item.user.name }
                      </Text>
                      {(() => {
                        if (question.mine) {
                          return (<Text
                              style={[styles.profileTimestamp,
                                { marginLeft: 8 }]}
                            >
                            { moment.unix(item.timestamp).fromNow() }
                          </Text>);
                        }
                      })()}
                    </View>
                    <View style={styles.requestApplyWrap}>
                      {(() => {
                        if (question.mine) {
                          return <ApplyButton onPress={this.onPressApprove(item.id)} />;
                        } else {
                          return (<Text style={styles.profileTimestamp}>
                            { moment.unix(item.timestamp).fromNow() }
                          </Text>);
                        }
                      })()}
                    </View>
                  </View>
                ))}
                {(() => {
                  if (!question.mine) {
                    return <FlatButton text="멘토링 지원" onPress={this.onPressApply} />;
                  }
                })()}
              </View>
            </ScrollView>);
          }
        })()}
        <Navbar current={routeName} />
      </View>
    );
  }
}

export default QuestionView;
