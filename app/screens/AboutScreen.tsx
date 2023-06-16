import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootScreens} from '../navigation/RootNavigation';
import WebView from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';
import {backgroundColor} from '../assets/colors/colors';
import {store} from '../redux/store/store';

const AboutScreen = ({navigation}: NativeStackScreenProps<RootScreens>) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={backgroundColor}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>

          <WebView
          source={{uri: 'https://www.google.com'}}
          />

        </LinearGradient>
    </SafeAreaView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
