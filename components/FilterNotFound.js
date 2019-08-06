import React from 'react';
import {
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const win = Dimensions.get('window');
const primaryColor = '#228BE6';
const styles = StyleSheet.create({
  notFound: {
    position: 'absolute',
    top: 20,
    width: win.width,
    alignItems: 'center',
  },
  notFoundText: {
    fontFamily: 'NotoSansCJKkr-Bold',
    fontSize: 21,
    lineHeight: 21 * 1.4,
  },
  removeFilter: {
    fontFamily: 'NotoSansCJKkr-Bold',
    color: primaryColor,
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
});

const FilterNotFound = ({ onPress, filterStart }) => (
  <TouchableOpacity
    style={styles.notFound}
    onPress={onPress}
  >
    <Text style={styles.notFoundText}>
      {(filterStart) ? '검색 결과가 없습니다.' : '데이터 로딩 중...'}
    </Text>
    {(() => {
      if (filterStart) {
        return (<Text style={styles.removeFilter}>
          필터 초기화
        </Text>);
      }
    })()}
  </TouchableOpacity>
);

export default FilterNotFound;
