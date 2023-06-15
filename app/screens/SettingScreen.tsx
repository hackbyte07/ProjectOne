import {Button, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootScreens} from '../navigation/RootNavigation';
import LinearGradient from 'react-native-linear-gradient';
import {backgroundColor} from '../assets/colors/colors';
import SettingItem from '../components/settings_screen/SettingItem';

const SettingScreen = ({navigation}: NativeStackScreenProps<RootScreens>) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={backgroundColor}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <SettingItem title="Profile" icon="user" onPress={() => {}} />
        <SettingItem
          title="About"
          icon="info"
          onPress={() => navigation.navigate('AboutScreen')}
        />
        <SettingItem title="Privacy" icon="slack" onPress={() => {}} />
        <Button
          title="Logout"
          onPress={() => {
            navigation.replace('LoginScreen');
          }}
        /> 
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
