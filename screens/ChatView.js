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
} from 'react-native';

import API from '../api';
import moment from '../time.js';
import DefaultHeader from '../components/DefaultHeader';

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
  }
});

const exampleChatData = [
  {
    id: '5d483792caa95227384f96da',
    type: 'text',
    sender: 'mentor',
    timestamp: 1565013906,
    message: '이 부분은 이렇게 해서 푸는 거에요.',
  },
  {
    id: '5d483792caa95227384f96da',
    type: 'text',
    sender: 'mentee',
    timestamp: 1565013906,
    message: '아하! 근데 저 부분 공식이 틀린 거 같아요.',
  },
  {
    id: '5d483792caa95227384f96da',
    type: 'text',
    sender: 'mentor',
    timestamp: 1565013906,
    message: '앗.. 그런가요? 저가 했을 땐 괜찮은 것 같은데..?',
  },
  {
    id: '5d483792caa95227384f96da',
    type: 'text',
    sender: 'mentee',
    timestamp: 1565013906,
    message: '그럼 선생님 리뷰를 요청해볼까요?',
  },
  {
    id: '5d483792caa95227384f96da',
    type: 'text',
    sender: 'mentor',
    timestamp: 1565013906,
    message: '네! 리뷰를 원하는 메시지를 꾹 누르면 리뷰를 요청할 수 있어요.',
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
      mentor: { 
        name: '우상윤',
      },
      mentee: {
        name: '여준호',
      },
      mine: 'mentee',
      chats: exampleChatData,
    };

    // API 호출 성공 시, 네비게이션 바 제목을 상대방 이름으로 설정
    const { mine, mentor, mentee } = this.state;
    this.props.navigation.setParams({
      'title': (mine !== 'mentor') ? mentor.name : mentee.name})
  }

  render() {
    const { mine } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView 
          ref="scrollView"
          onContentSizeChange={(_, height) => this.refs.scrollView.scrollTo({y: height})}
        >
          <View style={styles.chats}>
            <Text style={styles.help}>멘토링이 시작되었습니다.</Text>
            {this.state.chats.map((item, idx) => (
              <TouchableWithoutFeedback key={idx}>
                <View style={[styles.chatWrap, 
                  (item.sender === mine) ? 
                    styles.myChatWrap : styles.yourChatWrap]}
                >
                  <View style={[styles.chat, 
                    (item.sender === mine) ? 
                      styles.myChat : styles.yourChat]}
                  >
                    <Text style={[styles.chatText, 
                      (item.sender === mine) ? 
                        styles.myChatText : styles.yourChatText]}
                    >
                      {item.message}
                    </Text>
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
        </ScrollView>
      </View>
    );
  }
}

export default ChatView;
