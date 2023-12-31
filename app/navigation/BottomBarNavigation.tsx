import FavouriteScreen from '../screens/FavouriteScreen';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/AntDesign';
import {fontColorWhite, primaryColor} from '../assets/colors/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootScreens} from './RootNavigation';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabBarScreen({
  navigation,
}: NativeStackScreenProps<RootScreens>) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: primaryColor},
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: bar =>
            bar.focused ? (
              <Icon name="home" size={25} color={'tomato'} />
            ) : (
              <Icon name="home" size={25} color={'white'} />
            ),
          title: 'Home',

          headerStyle: {backgroundColor: primaryColor},
          headerTitleStyle: {color: fontColorWhite},

          headerRight: () => (
            <Icon
              name="search1"
              size={25}
              color={'white'}
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('SearchScreen')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FavouriteScreen"
        component={FavouriteScreen}
        options={{
          tabBarIcon: bar =>
            bar.focused ? (
              <Icon name="hearto" size={25} color={'tomato'} />
            ) : (
              <Icon name="hearto" size={25} color={'white'} />
            ),
          title: 'Favorite',

          headerStyle: {backgroundColor: primaryColor},
          headerTitleStyle: {color: fontColorWhite},
        }}
      />
      <Tab.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          headerShown: false,
          tabBarIcon: bar =>
            bar.focused ? (
              <Icon name="user" size={25} color={'tomato'} />
            ) : (
              <Icon name="user" size={25} color={'white'} />
            ),
          title: 'About',
        }}
      />
    </Tab.Navigator>
  );
}
