import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React, {FC} from 'react';
import {fontColorWhite, secondaryColor} from '../assets/colors/colors';
import {ImageUrl} from '../redux/slice/moviesSlice/moviesRequests';
import FastImage from 'react-native-fast-image';

type props = {
  title: string;
  image: string;
  onPress: () => void;
};

const {height,width} = Dimensions.get('screen');

const MovieItemLargeVertical: FC<props> = ({title, image, onPress}) => {
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

export default MovieItemLargeVertical;

const styles = StyleSheet.create({
    
    container: {
        width: width / 2.2,
        height: height/2.6,
        backgroundColor: 'transparent',
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 3,
        
      },
      image: {
        height: height/3,
        borderRadius: 10,
      },
      text: {
        fontSize: 12,
        textAlign: 'center',
        marginHorizontal: 5,
        marginTop: 5,
        color: fontColorWhite
      },
});
