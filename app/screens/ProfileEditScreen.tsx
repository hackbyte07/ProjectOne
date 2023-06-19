import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {backgroundColor} from '../assets/colors/colors';

const ProfileEditScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={backgroundColor}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>

            
        </LinearGradient>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
