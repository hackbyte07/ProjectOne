import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from '../screens/SplashScreen';
import BottomTabBarScreen from './BottomBarNavigation';
import SearchScreen from '../screens/SearchScreen';
import DetailScreen from '../screens/DetailScreen';
import {MoviesResult} from '../redux/slice/moviesSlice/moviesRequests';
import SectionScreen from '../screens/SectionScreen';
import YoutubeVideoScreen from '../screens/YoutubeVideoScreen';
import NetInfo from '@react-native-community/netinfo';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import NoInternetScreen from '../screens/NoInternetScreen';
import {primaryColor} from '../assets/colors/colors';

export type RootScreens = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  BottomTabBarScreen: undefined;
  SearchScreen: undefined;
  DetailScreen: MoviesResult;
  SectionScreen: {
    title: string;
  };
  YoutubeVideoScreen: {
    key: string;
  };
  NoInternetScreen: undefined;
};

const Stack = createNativeStackNavigator<RootScreens>();

const RootNavigation = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [internet, setInternet] = useState<boolean | null>(true);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setInternet(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {initializing ? (
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : internet ? (
          user ? (
            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen
                name="BottomTabBarScreen"
                component={BottomTabBarScreen}
              />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="SignupScreen" component={SignupScreen} />
              <Stack.Screen name="SearchScreen" component={SearchScreen} />
              <Stack.Screen name="DetailScreen" component={DetailScreen} />
              <Stack.Screen name="SectionScreen" component={SectionScreen} />
              <Stack.Screen
                name="YoutubeVideoScreen"
                component={YoutubeVideoScreen}
                options={{
                  headerShown: true,
                  title: 'Youtube',
                  headerStyle: {backgroundColor: primaryColor},
                  headerTintColor: 'white',
                }}
              />
            </Stack.Group>
          ) : (
            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="SignupScreen" component={SignupScreen} />
              <Stack.Screen
                name="BottomTabBarScreen"
                component={BottomTabBarScreen}
              />
              <Stack.Screen name="SearchScreen" component={SearchScreen} />
              <Stack.Screen name="DetailScreen" component={DetailScreen} />
              <Stack.Screen name="SectionScreen" component={SectionScreen} />
              <Stack.Screen
                name="YoutubeVideoScreen"
                component={YoutubeVideoScreen}
                options={{
                  headerShown: true,
                  title: 'Youtube',
                  headerStyle: {backgroundColor: primaryColor},
                  headerTintColor: 'white',
                }}
              />
            </Stack.Group>
          )
        ) : (
          <Stack.Screen
            name="NoInternetScreen"
            component={NoInternetScreen}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
