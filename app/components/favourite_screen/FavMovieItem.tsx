import {Pressable, StyleSheet, Text, Dimensions} from 'react-native';
import React, {FC} from 'react';
import FastImage from 'react-native-fast-image';
import {ImageUrl} from '../../redux/slice/moviesSlice/moviesRequests';
import {fontColorWhite} from '../../assets/colors/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {deleteFromFavorite} from '../../firebase/firestore/moviesDb';

type props = {
  movieId: number;
  title: string;
  imagePath: string;
  onPress: () => void;
};

const {width, height} = Dimensions.get('window');
const translateXThreshold = width * 0.5;

const FavMovieItem: FC<props> = ({movieId, title, imagePath, onPress}) => {
  const translateX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < -translateXThreshold;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-width);
        runOnJS(deleteFromFavorite)(movieId);
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rIconStyle = useAnimatedStyle(() => {
    const opacity = translateX.value < -translateXThreshold/2 ? 1 : 0;
    return {
      opacity: withTiming(opacity)
    };
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panGesture}>
      <Animated.View>
        <Animated.View style={[styles.delIconContainer, rIconStyle]}>
          <Icon name="delete" size={50} color={'tomato'} />
        </Animated.View>
        <Animated.View style={[rStyle]}>
          <Pressable onPress={onPress} style={styles.container}>
            <FastImage
              source={{uri: ImageUrl + imagePath}}
              style={styles.image}
            />

            <Text style={styles.text}>{title}</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default FavMovieItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    width: width - 30,
    marginVertical: 7.5,
    backgroundColor: 'transparent',
  },
  image: {
    height: height / 5,
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 5,
    marginTop: 5,
    color: fontColorWhite,
  },
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingTop: 5,
    paddingRight: 10,
  },
  delIconContainer: {
    position: 'absolute',
    height: height / 5,
    justifyContent: 'center',
    alignItems: 'center',
    right: '15%',
  },
});
