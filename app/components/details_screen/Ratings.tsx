import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useMemo} from 'react';
import {string} from 'yup';
import {fontColorWhite} from '../../assets/colors/colors';

type props = {
  rating: number;
};

const Ratings: FC<props> = ({rating}) => {
  const color = useMemo(() => {
    if (rating <= 4) {
      return 'tomato';
    } else if (rating > 4 && rating < 7) return 'yellow';
    else {
      return '#2FF924';
    }
  }, []);

  return (
    <View style={[styles.container, {borderColor: color}]}>
      <Text style={styles.rating}>{rating.toString().substring(0, 3)}</Text>
    </View>
  );
};

export default Ratings;

const size = 50;

const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: fontColorWhite,
  },
});
