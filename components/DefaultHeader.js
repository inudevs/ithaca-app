import React from 'react';
import {
  StyleSheet, View, Text, Image,
} from 'react-native';

const DefaultHeader = ({ title }) => {
  const headerStyles = StyleSheet.create({
    container: {
      flex: 0,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: '#E3E3E3',
      borderBottomWidth: 2,
    },
    title: {
      fontFamily: 'NotoSansCJKkr-Regular',
      fontSize: 22,
      color: 'black',
    },
  });

  return (
    <View style={headerStyles.container}>
      <Text style={headerStyles.title}>
        { title }
      </Text>
    </View>
  );
};

export default DefaultHeader;
