import React, { Component, Fragment } from 'react';
import {
  Alert,
  Text,
  Dimensions,
  StyleSheet,
  View,
  TouchableNativeFeedback,
} from 'react-native';
import TextboxInput from '../components/TextboxInput';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#F3F3F3',
    paddingVertical: 10,
    width: (win.width * 0.9),
    paddingHorizontal: 8,
    elevation: 2,
  },
  itemNotLast: {
    borderBottomColor: '#DBDBDB',
    borderBottomWidth: 1,
  },
  itemText: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 20,
    lineHeight: 20 * 1.4,
    color: 'black',
  }
});

class SchoolSearch extends Component {
  static defaultProps = {
    data: [],
    value: '',
    onChangeText: () => {},
    placeholder: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      showData: false,
      userInput: ''
    };
  }

  onChange = (text) => {
    const { data } = this.props;
    const userInput = text;

    const filteredData = data.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    ).slice(0, 3);

    this.setState({
      filteredData,
      showData: true,
      userInput: text
    });
  };

  onClick = (text) => {
    this.setState({
      filteredData: [],
      showData: false,
      userInput: text
    });
  };

  render() {
    const {
      onChange,
      onClick,
      state: {
        filteredData,
        showData,
        userInput
      }
    } = this;

    let dataListComponent;

    if (showData && userInput) {
      if (filteredData.length) {
        dataListComponent = (
          <View style={styles.list}>
            {filteredData.map((suggestion, index) => {
              return (
                  <TouchableNativeFeedback
                    onPress={() => onClick(suggestion)}
                    key={index}
                  >
                    <View style={[styles.item,
                      (index === suggestion.length - 1) ? {} : styles.itemNotLast ]}>
                      <Text style={styles.itemText}>
                        {suggestion}
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
              );
            })}
          </View>
        );
      }
    }

    return (
      <Fragment>
        <TextboxInput
          onChangeText={(text) => onChange(text)}
          value={userInput}
          noMargin={true}
        />
        {dataListComponent}
      </Fragment>
    );
  }
}

export default SchoolSearch;
