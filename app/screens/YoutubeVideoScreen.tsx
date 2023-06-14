import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootScreens} from '../navigation/RootNavigation';
import {primaryColor} from '../assets/colors/colors';
import YoutubeIframe from 'react-native-youtube-iframe';

const {width} = Dimensions.get('screen');

const YoutubeVideoScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootScreens, 'YoutubeVideoScreen'>) => {
  const data = route.params.key;

  return (
    <SafeAreaView style={styles.container}>
      <YoutubeIframe height={300} width={width} videoId={data} play />
    </SafeAreaView>
  );
};

export default YoutubeVideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primaryColor,
  },
});
