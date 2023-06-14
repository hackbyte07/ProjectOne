import {StyleSheet, Text, View, Pressable, Dimensions} from 'react-native';
import React, {FC} from 'react';
import FastImage from 'react-native-fast-image';
import {fontColorWhite} from '../../assets/colors/colors';
import Icon from 'react-native-vector-icons/AntDesign';

type props = {
  name: string;
  site: string;
  type: string;
  imageKey: string;
  onPress: () => void;
};

const {width} = Dimensions.get('screen');

const VideoItem: FC<props> = ({name, site, type, imageKey, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <FastImage
        source={{uri: `https://img.youtube.com/vi/${imageKey}/hqdefault.jpg`}}
        style={styles.image}
      />
      <Icon name="play" size={25} color={'white'} style={styles.playIcon} />

      <Text numberOfLines={2} style={styles.name}>
        {name}
      </Text>
    </Pressable>
  );
};

export default VideoItem;

const styles = StyleSheet.create({
  container: {
    height: 150,
    marginHorizontal: 7.5,
    width: width / 1.5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    borderRadius: 5,
  },
  name: {
    fontSize: 12,
    color: fontColorWhite,
    paddingVertical: 5,
    textAlign: 'justify',
  },
  playIcon: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
