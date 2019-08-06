/**
 * Mentor
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
  Button,
} from 'react-native';
import Navbar from '../components/Navbar';

const win = Dimensions.get('window');

const highlightColor = '#339AF0';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'space-between',
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: 1,
  },
  profileimage: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    borderRadius: 40,
    borderColor: '#E2E2E2',
    borderWidth: 2,
  },
  name: {
    fontFamily: 'NotoSansCJKkr-Bold',
    lineHeight: 25 * 1.4,
    fontSize: 25,
    textAlign: 'left',
    marginLeft: 20,
  },
  text: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 15,
    lineHeight: 25 * 1.4,
    color: '#AAA',
    textAlign: 'left',
    marginLeft: 20,
  },
  textarray: {
    width: (win.width * 0.75),
    justifyContent: 'center',
  },
})

const exampleList = [
  {
    grade: 1,
    klass: 5,
    num: 15,
    name: '송지호',
    image: require('../assets/examples/profile.png'),
    timestamp: 1564975538,
  },
  {
    grade: 1,
    klass: 5,
    num: 20,
    name: '여준호',
    image: require('../assets/examples/profile.png'),
    timestamp: 1564975538,
  },
  {
    grade: 1,
    klass: 5,
    num: 22,
    name: '우상윤',
    image: require('../assets/examples/profile.png'),
    timestamp: 1564975538,
  },
  {
    grade: 1,
    klass: 4,
    num: 32,
    name: '천예준',
    image: require('../assets/examples/profile.png'),
    timestamp: 1564975538,
  },
  {
    grade: 1,
    klass: 4,
    num: 16,
    name: '백은서',
    image: require('../assets/examples/profile.png'),
    timestamp: 1564975538,
  },
];

class Mentor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list : exampleList,
    }
  }

  render(){
    const { navigation: { state: { routeName } } } = this.props;
    const { list } = this.state;
    return(
      <View style={styles.container}>
        {list.map((item, idx) => (
          <TouchableOpacity style={styles.list}>
            <Image
              source={item.image}
              resizeMode='cover'
              style={styles.profileimage}
            />
            <View style={styles.textarray}>
              <Text style={styles.name}>
                {item.name}
                <Text style={styles.text}>   {item.grade}학년 {item.klass}반 {item.num}번</Text>
              </Text>
                <Text style={styles.text}>문제 보기</Text>
            </View>
          </TouchableOpacity>
        ))}
        <Navbar current={routeName} />
      </View>
    )
  }
}

export default Mentor;