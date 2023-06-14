import {
  Pressable,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import React, {FC} from 'react';
import {fontColorWhite} from '../assets/colors/colors';
import {ImageUrl} from '../redux/slice/moviesSlice/moviesRequests';
import FastImage from 'react-native-fast-image';

type props = {
  title: string;
  image: string;
  onPress: () => void;
};

const {width} = Dimensions.get('screen');

const MovieItem: FC<props> = ({title, image, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <FastImage
        source={{
          uri: ImageUrl + image,
        }}
        style={styles.image}
      />
      <Text numberOfLines={2} style={styles.text}>
        {title}
      </Text>
    </Pressable>
  );
};

export default MovieItem;

const styles = StyleSheet.create({
  container: {
    width: width / 4,
    height: 200,
    backgroundColor: 'transparent',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 3,
  },
  image: {
    height: 150,
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 5,
    marginTop: 5,
    marginBottom: 15,
    color: fontColorWhite,
  },
});
