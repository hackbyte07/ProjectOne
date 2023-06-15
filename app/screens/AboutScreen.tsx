import {Button, StyleSheet, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootScreens} from '../navigation/RootNavigation';
import auth from '@react-native-firebase/auth';
import WebView from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';
import { backgroundColor } from '../assets/colors/colors';

const AboutScreen = ({navigation}: NativeStackScreenProps<RootScreens>) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={backgroundColor}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <WebView
          source={{uri: 'https://www.google.com/'}}
          javaScriptEnabled
          domStorageEnabled
          allowsBackForwardNavigationGestures
          style={styles.webview}
        />
        <Button
          title="logout"
          onPress={() => {
            auth().signOut();
            navigation.replace('LoginScreen');
          }}
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
  webview: {
    flex: 1,
  },
});
