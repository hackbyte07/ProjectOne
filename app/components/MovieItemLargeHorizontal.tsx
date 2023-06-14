import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import React, {FC} from 'react';
import {ImageUrl} from '../redux/slice/moviesSlice/moviesRequests';
import {fontColorWhite} from '../assets/colors/colors';
import {Shadow} from 'react-native-shadow-2';
import FastImage from 'react-native-fast-image';

type props = {
  title: string;
  overview: string;
  posterPath: string;
  bannerPath: string;
  onPress: () => void;
};

const {width} = Dimensions.get('screen');

const MovieItemLargeHorizontal: FC<props> = ({
  title,
  overview,
  posterPath,
  bannerPath,
  onPress,
}) => {
  return (
    <ImageBackground
      imageStyle={styles.containerImage}
      style={styles.container}
      source={{uri: ImageUrl + bannerPath}}>
      <Pressable style={styles.subView} onPress={onPress}>
        <FastImage style={styles.poster} source={{uri: ImageUrl + posterPath}} />
        <Shadow
          style={styles.textView}
          offset={[7, 8]}
          startColor="rgba(0, 0, 0, 0.7)">
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={3} style={styles.overview}>
            {overview}
          </Text>
        </Shadow>
      </Pressable>
    </ImageBackground>
  );
};

export default MovieItemLargeHorizontal;

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: width / 1.4,
    overflow: 'hidden',
    marginHorizontal: 3,
    marginBottom: 15,
    padding: 5,
  },
  containerImage: {
    borderRadius: 10,
  },
  poster: {
    height: '50%',
    width: '25%',
    borderRadius: 5,
  },
  subView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
  },

  textView: {
    marginLeft: 5,
    width: 200,
    padding: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: fontColorWhite,
  },
  overview: {
    fontSize: 12,
    color: fontColorWhite,
  },
});
