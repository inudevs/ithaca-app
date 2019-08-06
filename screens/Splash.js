import React, { Component } from 'react';
import { 
  View, 
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

const win = Dimensions.get('window');

class Splash extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
  }

  render () {
    return (<TouchableWithoutFeedback
      onPress={() => this.props.navigation.navigate('Home')}
    >
      <View style={{flex:1, backgroundColor: '#3DA4FA'}}>
        <Image
          source={require('../assets/logo.png')}
          resizeMode="contain"
          style={{ width: win.width * 0.8, alignSelf: 'center', marginTop: win.height * 0.13 }}
        />
      </View>
    </TouchableWithoutFeedback>);
  }
}

export default Splash;
