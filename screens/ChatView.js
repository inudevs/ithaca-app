/**
 * ChatView
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
  TouchableWithoutFeedback,
  TextInput,
  Modal,
  TouchableHighlight,
} from 'react-native';

import API from '../api';
import moment from '../time.js';
import DefaultHeader from '../components/DefaultHeader';
import TextareaInput from '../components/TextareaInput';

const win = Dimensions.get('window');

const highlightColor = '#339AF0';
const primaryColor = '#228BE6';
const chatFontSize = 17;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  chats: {
    paddingHorizontal: 20,
  },
  help: {
    alignSelf: 'center',
    color: 'black',
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: chatFontSize,
    lineHeight: chatFontSize * 1.4,
    marginTop: 10,
    marginBottom: 15,
  },
  chatWrap: {
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  yourChatWrap: {
    flexDirection: 'row',
  },
  myChatWrap: {
    flexDirection: 'row-reverse',
  },
  chat: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: chatFontSize,
  },
  yourChat: {
    backgroundColor: 'white',
    maxWidth: (win.width * 0.7),
    borderTopLeftRadius: 0,
  },
  myChat: {
    backgroundColor: primaryColor,
    maxWidth: (win.width * 0.75),
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  yourImage: {
    width: (win.width * 0.5),
    height: (win.width * 0.5),
    borderRadius: chatFontSize,
    borderTopLeftRadius: 0,
  },
  myImage: {
    width: (win.width * 0.5),
    height: (win.width * 0.5),
    alignSelf: 'flex-end',
    borderRadius: chatFontSize,
    borderTopRightRadius: 0,
  },
  chatText: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: chatFontSize,
    lineHeight: chatFontSize * 1.4,
  },
  yourChatText: {
    color: 'black',
  },
  myChatText: {
    color: 'white',
  },
  chatTimestamp: {
    color: '#A5A5A5',
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    lineHeight: 14 * 1.4,
  },
  yourChatTimestamp: {
    marginLeft: 4,
  },
  myChatTimestamp: {
    marginRight: 4,
  },
  textbox: {
    backgroundColor: '#e9ecef',
    width: (win.width * 0.8),
    paddingHorizontal: 20,
    // alignSelf: 'center',
    marginBottom: 20,
    height: 50,
  },
  input: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 15,
    lineHeight: 15 * 1.4,
    paddingTop: 0,
    paddingBottom: 0,
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  send: {
    backgroundColor: primaryColor,
    borderRadius: 20,
    height: 40,
    width: 60,
    marginTop: 8,
    marginLeft: 5,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  sendText: {
    fontFamily: 'NotoSansCJKkr-Bold',
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: 'white',
    // marginHorizontal: 10,
    // marginVertical: 8,
  }
});

const exampleChatData = [
  {
    id: '5d483792caa95227384f96da',
    type: 'text',
    sender: 'mentor',
    timestamp: 1565113441,
    message: '이 문제는 실수 조건이 있는 이차식의 최대, 최소를 구하는 문제네요!',
  },
  {
    id: '5d483792caa95227384f96da',
    type: 'text',
    sender: 'mentee',
    timestamp: 1565114441,
    message: '식을 보면 이차식인건 알겠는데, 풀이 접근 방식을 잘 생각해내지 못하겠네요...',
  },
  {
    id: '5d483792caa95227384f96da',
    type: 'text',
    sender: 'mentor',
    timestamp: 1565115441,
    message: '자세히 살펴보면, x^2 ≥ 0 (단, x ∈ R)라는 절대 부등식을 이용해 문제를 풀어낼 수 있습니다. 주어진 이차식은 x, y와 관해 이차식을 형성하고 있으므로 a(x+b)^2 + c(x+d)^2 + e의 형태로 변형이 가능합니다.',
  },
  {
    id: '5d483792caa95227384f96da',
    type: 'text',
    sender: 'mentee',
    timestamp: 1565115641,
    message: '식을 변형해보니 2(x-1)^2 + 3(y+1)^2 + 5라는 식이 나오네요.',
  },
  {
    id: '5d483792caa95227384f96da',
    type: 'text',
    sender: 'mentor',
    timestamp: 1565115741,
    message: '그렇다면 x, y가 모두 실수이므로 2(x-1)^2 + 3(y+1)^2 ≥ 5 이 성립하겠네요. 즉 문제의 해답은 5 입니다. 이 문제와 관련해 원뿔 곡선과 음함수 표현에 대하여 살펴봐도 좋을것 같아요',
  },
  {
    id: '5d483792caa95227384f96da',
    type: 'text',
    sender: 'mentee',
    timestamp: 1565115841,
    message: '새로운 정보 감사합니다!',
  },
  {
    id: '5d483792caa95227384f96da',
    type: 'image',
    sender: 'mentor',
    timestamp: 1565115941,
    image: require('../assets/examples/plot.png'),
  },
  {
    id: '5d483792caa95227384f96da',
    type: 'text',
    sender: 'mentor',
    timestamp: 1565115941,
    message: '울프럼 알파로 그린 3D plot 그림인데, 함께 참고하시면 좋을 것 같아서 올립니다!',
  },
]

class ChatView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: props => <DefaultHeader title={
        navigation.getParam('title', '멘토링')
      } {...props} />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      users: {},
      mine: 'mentee',
      chats: exampleChatData,
      loaded: false,
      message: '',
      modalVisible: false,
    };
    this.onSendChat = this.onSendChat.bind(this);
    this.openTeacher = this.openTeacher.bind(this);
  }

  async componentDidMount() {
    const loaded = true
    const { navigation } = this.props;
    const users = JSON.parse(navigation.getParam('user', 
      '{"mentor":{"name":"송지호"},"mentee":{"name":"여준호"}}'));
    this.setState({ users, loaded });
    // const token = navigation.getParam('token', 'NO-TOKEN');

    const { mine } = this.state;
    // API 호출 성공 시, 네비게이션 바 제목을 상대방 이름으로 설정
    const { mentor, mentee } = users;
    this.props.navigation.setParams({
      'title': (mine !== 'mentor') ? mentor.name : mentee.name})
  }

  onSendChat = () => {
    let { chats, message } = this.state;
    if (!message) return;
    chats.push({
      id: '5d483792caa95227384f96da',
      type: 'text',
      sender: 'mentee',
      timestamp: moment().unix(),
      message,
    })
    this.setState({
      chats,
      message: ''
    })
  }

  openTeacher = (visible) => {
    this.setState({modalVisible: visible});
  }

  render() {
    const { mine, loaded } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView 
          ref="scrollView"
          onContentSizeChange={(_, height) => this.refs.scrollView.scrollTo({y: height})}
        >
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            // onRequestClose={() => {
            //   Alert.alert('Modal has been closed.');
            // }}
          >
            <View style={{
                marginTop: 120, backgroundColor: 'white', marginHorizontal: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3, }, 
                shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6,
                paddingHorizontal: 20,
                paddingVertical: 20,
                borderRadius: 20,
              }}
            >
              <View>
                <Text style={{
                  fontFamily: 'NotoSansCJKkr-Bold',
                  fontSize: 20,
                  lineHeight: 20 * 1.4,
                  color: primaryColor,
                }}>선생님 리뷰 요청</Text>

                <TextInput
                  editable={true}
                  // onChangeText={onChangeText}
                  // value={value}
                  style={[styles.textbox, styles.input, {
                    borderRadius: 10,
                    marginTop: 10,
                  }]}
                  inputProps={styles.input}
                  placeholder="선생님께 질문해 보세요."
                  numberOfLines={5}
                  multiline={true}
                />

                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <TouchableHighlight
                    style={{
                      alignSelf: 'center',
                      backgroundColor: highlightColor,
                      borderRadius: 20,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      shadowColor: "#000",
                      shadowOffset: { width: 2, height: 3, }, 
                      shadowOpacity: 0.5, shadowRadius: 4.65, elevation: 6,
                    }}
                    onPress={() => {
                      this.openTeacher(!this.state.modalVisible);
                    }}>
                    <Text style={{fontFamily: 'NotoSansCJKkr-Regular',
                      fontSize: 15,
                      lineHeight: 15 * 1.4,
                      color: '#fff',}}>전송</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    style={{
                      marginLeft: 5,
                      alignSelf: 'center',
                      backgroundColor: '#fff',
                      borderRadius: 20,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      shadowColor: "#000",
                      shadowOffset: { width: 2, height: 3, }, 
                      shadowOpacity: 0.5, shadowRadius: 4.65, elevation: 6,
                    }}
                    onPress={() => {
                      this.openTeacher(!this.state.modalVisible);
                    }}>
                    <Text style={{fontFamily: 'NotoSansCJKkr-Regular',
                      fontSize: 15,
                      lineHeight: 15 * 1.4,
                      color: '#000',}}>닫기</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
          {(() => {
            if (loaded) {
              return <View style={styles.chats}>
              <Text style={styles.help}>멘토링이 시작되었습니다.</Text>
              {this.state.chats.map((item, idx) => (
                <TouchableWithoutFeedback key={idx} onLongPress={() => this.openTeacher(true)}>
                  <View style={[styles.chatWrap, 
                    (item.sender === mine) ? 
                      styles.myChatWrap : styles.yourChatWrap]}
                  >
                    <View style={[styles.chat, 
                      (item.sender === mine) ? 
                        styles.myChat : styles.yourChat]}
                    >
                      {(() => {
                        if (item.type === 'text') {
                          return <Text style={[styles.chatText, 
                            (item.sender === mine) ? 
                              styles.myChatText : styles.yourChatText]}
                          >
                            {item.message}
                          </Text>;
                        } else {
                          return <Image
                            source={item.image}
                            resizeMode='cover'
                            style={(item.sender === mine) ? 
                              styles.myImage : styles.yourImage}
                          />;
                        }
                      })()}
                    </View>
                    <Text style={[styles.chatTimestamp, 
                      (item.sender === mine) ? 
                        styles.myChatTimestamp : styles.yourChatTimestamp]}
                    >
                      {moment.unix(item.timestamp).format('a hh:mm')}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
            }
          })()}
        </ScrollView>
        <View style={styles.inputBox}>
          <TextInput
            editable={true}
            onChangeText={(message) => this.setState({ message })}
            value={this.state.message}
            style={[styles.textbox, styles.input]}
            inputProps={styles.input}
            placeholder="메세지를 입력하세요."
          />
          <TouchableWithoutFeedback
            onPress={() => this.onSendChat()}
          >
            <View style={styles.send}>
              <Text style={styles.sendText}>전송</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

export default ChatView;
