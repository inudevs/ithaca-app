import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';
import { withNavigation } from 'react-navigation';

const win = Dimensions.get('window');

const navList = [
  {
    route: 'Home', 
    icon: require('../assets/icons/normal/list.png'), 
    selected: require('../assets/icons/selected/list.png')
  },
  {
    route: 'User',
    icon: require('../assets/icons/normal/user.png'),
    selected: require('../assets/icons/selected/user.png')
  },
  {
    // route: 'Scan',
    route: 'Write',
    icon: require('../assets/icons/normal/scan.png'),
    selected: require('../assets/icons/selected/scan.png')
  },
  {
    route: 'Alarm',
    icon: require('../assets/icons/normal/alarm.png'),
    selected: require('../assets/icons/selected/alarm.png')
  },
  {
    route: 'Mentor',
    icon: require('../assets/icons/normal/mentor.png'),
    selected: require('../assets/icons/selected/mentor.png')
  },
];

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: win.width,
  },
  lines: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  line: {
    height: 3,
    backgroundColor: '#E2E2E2',
    width: (win.width / navList.length),
  },
  row: {
    zIndex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  item: {
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  }
});

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  onPress = (routeName) => {
    this.props.navigation.navigate(routeName);
  };

  render() {
    const { current } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.lines}>
          {navList.map((item, idx) => (
            <View style={[styles.line, { backgroundColor: 
              (current === item.route || (item.route === 'Home' && current === 'Question')) ? '#339AF0': '#E2E2E2' }]} key={idx} />
          ))}
        </View>
        <View style={styles.row}>
          {navList.map((item, idx) => (
            <TouchableWithoutFeedback
              columnWrapperStyle={styles.row}
              onPress={() => this.onPress(item.route)}
              key={idx}
            >
              <View style={styles.item}>
                <Image
                  style={styles.icon}
                  resizeMode="contain"
                  source={(current === item.route || (item.route === 'Home' && current === 'Question')) ? item.selected : item.icon}
                />
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    );
  }
}

export default withNavigation(Navbar);
