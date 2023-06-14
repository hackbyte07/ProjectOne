import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {backgroundColor, primaryColor} from '../assets/colors/colors';
import AnimatedLottieView from 'lottie-react-native';
import {moviesCollection} from '../firebase/firestore/moviesDb';
import {useState} from 'react';
import {MoviesResult} from '../redux/slice/moviesSlice/moviesRequests';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootScreens} from '../navigation/RootNavigation';
import FavMovieItem from '../components/favourite_screen/FavMovieItem';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const FavouriteScreen = ({navigation}: NativeStackScreenProps<RootScreens>) => {
  useEffect(() => {
    const subscriber = moviesCollection.onSnapshot(doc => {
      const tmpArray: Array<MoviesResult> = [];
      doc.forEach(result => {
        tmpArray.push(result.data() as MoviesResult);
        console.log(result.data());
      });
      setFavoriteMovies(tmpArray);
    });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const [favoriteMovies, setFavoriteMovies] = useState<Array<MoviesResult>>([]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <LinearGradient
        style={styles.container}
        colors={backgroundColor}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {favoriteMovies?.length < 1 ? (
          <View style={styles.lottieViewContainer}>
            <AnimatedLottieView
              source={require('../assets/lottie/favourite.json')}
              style={styles.lottieView}
              autoPlay
              loop={false}
              hardwareAccelerationAndroid
            />
          </View>
        ) : (
          <Animated.FlatList
            data={favoriteMovies}
            keyExtractor={item => item.id.toString()}
            entering={FadeIn}
            exiting={FadeOut}
            contentContainerStyle={styles.listContentStyle}
            renderItem={item => (
              <FavMovieItem
                movieId={item.item.id}
                title={item.item.title}
                imagePath={item.item.backdrop_path}
                onPress={() => {
                  navigation.navigate('DetailScreen', item.item);
                }}
              />
            )}
          />
        )}
      </LinearGradient>
    </GestureHandlerRootView>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottieView: {
    aspectRatio: 1,
  },
  lottieViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  listContentStyle: {
    alignItems: 'center',
    marginTop: 15,
  },
});
