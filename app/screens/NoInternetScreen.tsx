import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AnimatedLottieView from 'lottie-react-native';

const NoInternetScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AnimatedLottieView
        style={styles.animation}
        source={{uri: '../assets/lottie/no-internet.json'}}
      />
      <Text>No Internet</Text>
    </SafeAreaView>
  );
};

export default NoInternetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    height: 400,
    width: 400,
    aspectRatio: 1,
  },
});
