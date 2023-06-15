import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootScreens} from '../navigation/RootNavigation';
import WebView from 'react-native-webview';

const AboutScreen = ({navigation}: NativeStackScreenProps<RootScreens>) => {
  return (
    <SafeAreaView>
      <WebView source={{uri: 'https://www.google.com/'}} style={styles.webView} />
    </SafeAreaView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  }
});
