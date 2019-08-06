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
import API from '../api';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
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
    value: '',
    selected: false,
    onChangeValue: () => {},
    onChangeSelected: () => {},
    placeholder: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
    };
    this.updateResult = this.updateResult.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  updateResult = (query) => {
    API.get(`/search/school/${query}`)
      .then((res) => {
        this.setState({
          dataList: res.data
        })
      });
  }

  onChangeText = (text) => {
    if (this.state.dataList[0] != this.props.value)
      this.props.onChangeSelected(false);
    if (text) this.updateResult(text);
    this.props.onChangeValue(text);
  }

  onSelect = (text) => {
    if (!this.props.selected)
      this.props.onChangeSelected(true);
    if (text) this.updateResult(text);
    this.props.onChangeValue(text);
  }

  render() {
    const { dataList } = this.state;
    const { selected } = this.props;
    return (
      <Fragment>
        <TextboxInput
          onChangeText={(text) => this.onChangeText(text)}
          value={this.props.value}
          noMargin={true}
          placeholder={this.props.placeholder}
        />
        <View style={styles.list}>
          {(() => {
            if (!selected) {
              return dataList.map((school, idx) => {
                return (<TouchableNativeFeedback
                  onPress={() => this.onSelect(school)}
                  key={idx}
                >
                  <View style={[styles.item,
                    (idx === dataList.length - 1) ? {} : styles.itemNotLast ]}>
                    <Text style={styles.itemText}>
                      {school}
                    </Text>
                  </View>
                </TouchableNativeFeedback>);
              })
            }
          })()}
        </View>
      </Fragment>
    );
  }
}

export default SchoolSearch;
