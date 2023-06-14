import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {backgroundColor} from '../assets/colors/colors';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.bg}
        colors={backgroundColor}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <FastImage
          source={require('../assets/images/appLogo.png')}
          style={styles.image}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
  },
});
