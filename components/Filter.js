import React from 'react';
import {
  Dimensions,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  Image,
  View,
  ScrollView,
} from 'react-native';

const win = Dimensions.get('window');

const highlightColor = '#339AF0';
const primaryColor = '#228BE6';
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 63,
    zIndex: 1,
    backgroundColor: primaryColor,
    height: win.height * 0.3,
    width: win.width,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 2,
  },
  head: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevron: {
    height: 15,
    width: 50,
    marginTop: 15,
    marginBottom: 10,
  },
  desc: {
    color: 'white',
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 18,
    lineHeight: 18 * 1.4,
    marginBottom: 10,
  },
  selected: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    paddingHorizontal: 15,
    marginBottom: 3,
  },
  category: {
    marginBottom: 8,
    backgroundColor: 'white',
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 10,
    borderRadius: 10,
    elevation: 2,
  },
  categoryText: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 23,
    color: highlightColor,
    lineHeight: 23 * 1.4,
  },
  categoryIcon: {
    width: 25,
    height: 25,
  },
  others: {
    flex: 1,
    backgroundColor: highlightColor,
    paddingHorizontal: 15,
  },
  categoryNormal: {
    marginTop: 8,
    backgroundColor: primaryColor,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 10,
    borderRadius: 10,
    // borderColor: 'white',
    // borderWidth: 1,
    elevation: 1,
  },
  categoryNormalText: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 23,
    color: 'white',
    lineHeight: 23 * 1.4,
  },
  categoryNormalIcon: {
    width: 25,
    height: 25,
  },
});

// const selected = ['국어', '사회'];
// const others = ['역사', '수학', '과학', '영어', '기타'];

const Filter = ({ subjects, onSelectSubject, onFilterClose }) => (
  <View style={styles.container}>
    <TouchableNativeFeedback onPress={onFilterClose}>
      <View style={styles.head}>
        <Image
          style={styles.chevron}
          source={require('../assets/icons/chevron.png')}
        />
        <Text style={styles.desc}>검색할 과목을 선택하세요</Text>
      </View>
    </TouchableNativeFeedback>
    <View style={styles.selected}>
      {subjects.filter((subject) => subject.selected)
        .map((subject, idx) => {
        return (<TouchableNativeFeedback
            onPress={() => onSelectSubject(subject.value)}
            key={idx}
          >
          <View style={styles.category}>
            <Text style={styles.categoryText}>
              { subject.value } <Image
                style={styles.categoryIcon}
                source={require('../assets/icons/normal/minus.png')}
              />
            </Text>
          </View>
        </TouchableNativeFeedback>);
      })}
    </View>
    <ScrollView style={styles.others}>
      <View style={{ flexWrap: 'wrap', flexDirection:'row', alignItems: 'flex-start'}}>
        {subjects.filter((subject) => !subject.selected)
          .map((subject, idx) => {
          return (<TouchableNativeFeedback
              onPress={() => onSelectSubject(subject.value)}
              key={idx}
            >
            <View style={styles.categoryNormal}>
              <Text style={styles.categoryNormalText}>
                { subject.value } <Image
                  style={styles.categoryNormalIcon}
                  source={require('../assets/icons/selected/plus.png')}
                />
              </Text>
            </View>
          </TouchableNativeFeedback>);
        })}
      </View>
    </ScrollView>
  </View>
);

export default Filter;
