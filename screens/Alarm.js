/**
 * Alarm
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import moment from '../time.js';
import Navbar from '../components/Navbar';

const win = Dimensions.get('window');

const highlightColor = '#339AF0';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  alarm: {
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'space-between',
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: 2,
  },
  profileimage: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    borderRadius: 40,
    borderColor: '#E2E2E2',
    borderWidth: 2,
  },
  textline: {
    width: (win.width * 0.75),
    justifyContent: 'center',
    marginLeft: 10,
  },
  text: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 15,
    lineHeight: 15 * 1.4,
  },
  textbold: {
    fontFamily: 'NotoSansCJKkr-Bold',
    fontSize: 15,
    lineHeight: 15 * 1.4,
  },
  request: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: highlightColor,
  },
  timestamp: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: '#AAA',
  },
})

const exampleAlarm = [
  {
    context: '지원',
    user: '여준호',
    timestamp: 1564975538,
    image: require('../assets/examples/profile.png'),
  },
  {
    context: '지원',
    user: '우상윤',
    timestamp: 1564975538,
    image: require('../assets/examples/profile.png'),
  },
  {
    context: '수락',
    user: '여준호',
    timestamp: 1564975538,
    image: require('../assets/examples/profile.png'),
  },
  {
    context: '수락',
    user: '천예준',
    timestamp: 1564975538,
    image: require('../assets/examples/profile.png'),
  }
]

class Alarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarms: exampleAlarm,
    }
  }

  render(){
    const { navigation: { state: { routeName } } } = this.props;
    const { alarms } = this.state;
    return(
      <View style={styles.container}>
        {alarms.map((item, idx) => {
          return (
            <TouchableOpacity key={idx}>
              <View
                style={styles.alarm}
              >
                <Image
                  source={item.image}
                  resizeMode='cover'
                  style={styles.profileimage}
                />
                  {(item.context === '지원') ?
                    <View style={styles.textline}>
                      <Text style={styles.text}>
                        <Text style={styles.textbold}>{item.user}</Text>님이 멘토링을 지원했습니다.
                      </Text>
                      <Text style={styles.text}>
                        <Text style={styles.request}>멘토링 > 요청</Text>에서 수락하실 수 있습니다.
                      </Text>
                      <Text style={styles.timestamp}>
                        {moment.unix(item.timestamp).fromNow()}
                      </Text> 
                    </View>
                    :
                    <View style={styles.textline}>
                      <Text style={styles.text}>
                        <Text style={styles.textbold}>{item.user}</Text>님과의 멘토링이 수락되었습니다.
                      </Text>
                      <Text style={styles.text}>
                        <Text style={styles.request}>멘토링 > 내 멘티</Text>를 확인해주세요.
                      </Text>
                      <Text style={styles.timestamp}>
                        {moment.unix(item.timestamp).fromNow()}
                      </Text>
                    </View>
                  }
                </View>
            </TouchableOpacity>)
        })}
        <Navbar current={routeName} />
      </View>
    )
  }
}

export default Alarm;