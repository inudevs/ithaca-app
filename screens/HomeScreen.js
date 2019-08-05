/**
 * HomeScreen
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
} from 'react-native';

import API from '../api';
import moment from '../time.js';
import Navbar from '../components/Navbar';
import FilterButton from '../components/FilterButton';
import Filter from '../components/Filter';

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
  questionLast: {
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'NotoSansCJKkr-Bold',
    fontSize: 22,
    lineHeight: 22 * 1.4,
  },
  category: {
    color: highlightColor,
  },
  meta: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  name: {
    fontFamily: 'NotoSansCJKkr-Regular',
    color: 'black',
    fontSize: 15,
    lineHeight: 15 * 1.4,
    marginRight: 5,
  },
  timestamp: {
    fontFamily: 'NotoSansCJKkr-Regular',
    color: '#5F5F5F',
    fontSize: 15,
    lineHeight: 15 * 1.4,
    marginRight: 5,
  },
  status: {
    fontFamily: 'NotoSansCJKkr-Regular',
    color: primaryColor,
    fontSize: 15,
    lineHeight: 15 * 1.4,
    marginRight: 5,
  },
  photo: {
    height: (win.height * 0.18),
    width: (win.width - 40),
    borderColor: '#AAA',
    borderWidth: 2,
  },
  footer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  requests: {
    fontFamily: 'NotoSansCJKkr-Regular',
    color: primaryColor,
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
  eye: {
    width: 18,
    height: 9,
  },
  views: {
    fontFamily: 'NotoSansCJKkr-Regular',
    color: '#ABABAB',
    fontSize: 15,
    lineHeight: 15 * 1.4,
  }
});

const exampleQuestionData = [
  {
    id: '5d47a1b2db87e70f7aa22ef5',
    user: { name: '테스트' },
    status: 'C',
    timestamp: 1564975538,
    title: '이걸 모르겠어요',
    category: '영어',
    photo: 'https://via.placeholder.com/500x300',
    image: require('../assets/examples/english.png'),
    views: 12,
    requests: 4,
  },
  {
    id: '5d47a1b2db87e70f7aa22ef5',
    user: { name: '테스트' },
    status: 'C',
    timestamp: 1564550000,
    title: '이 문제의 풀이과정을 자세히 알려주실 분을 구합니다.',
    category: '수학',
    photo: 'https://via.placeholder.com/500x300',
    image: require('../assets/examples/math.png'),
    views: 12,
    requests: 4,
  },
]

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: exampleQuestionData,
      subjects: [
        { value: '국어', selected: false },
        { value: '영어', selected: false },
        { value: '수학', selected: false },
        { value: '사회', selected: false },
        { value: '과학', selected: false },
        { value: '역사', selected: false },
        { value: '기타', selected: false },
      ],
      filterShow: false,
    };
    this.onSelectSubject = this.onSelectSubject.bind();
  }

  onSelectSubject = (subject) => {
    let { subjects } = this.state;
    let subjectIdx;
    subjects.some(function(item, idx) { subjectIdx = idx; return (item.value === subject); });
    subjects[subjectIdx].selected = !subjects[subjectIdx].selected
    this.setState({subjects})
  }

  render() {
    const { navigation: { state: { routeName } } } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.questions}>
            {this.state.questions.map((item, idx) => (
              <View
                style={[(idx === this.state.questions.length - 1) ? styles.questionLast: styles.question ]}
                key={idx}
              >              
                <Text style={styles.title}>
                  <Text style={styles.category}>{item.category}</Text>
                  <Text style={styles.blank}> </Text>
                  {item.title}
                </Text>
                <View style={styles.meta}>
                  <Text style={styles.name}>{item.user.name}</Text>
                  <Text style={styles.timestamp}>{moment.unix(item.timestamp).fromNow()}</Text>
                  <Text style={styles.status}>
                    {(item.status=='P') ? '진행중' : '완료'}
                  </Text>
                </View>
                <Image
                  // source={{uri: item.photo}}
                  source={item.image}
                  resizeMode="cover"
                  style={styles.photo}
                />
                <View style={styles.footer}>
                  <Text style={styles.requests}>답변 {item.requests}</Text>
                  <Text style={styles.views}>
                    <Image
                      source={require('../assets/icons/eye.png')}
                      style={styles.eye}
                    /> {item.views}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        {(() => {
          if (!this.state.filterShow) {
            return <FilterButton onPress={() => this.setState({ filterShow: true })} />;
          } else {
            return (<Filter
              subjects={this.state.subjects}
              onSelectSubject={(subject) => this.onSelectSubject(subject)}
              onFilterClose={() => this.setState({ filterShow: false })}
            />);
          }
        })()}
        <Navbar current={routeName} />
      </View>
    );
  }
}

export default HomeScreen;
