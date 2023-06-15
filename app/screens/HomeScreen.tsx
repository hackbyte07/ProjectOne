import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MovieItem from '../components/MovieItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  backgroundColor,
  fontColorWhite,
  primaryColor,
} from '../assets/colors/colors';
import ScreenLoadingComponent from '../components/ScreenLoadingComponent';
import {RootScreens} from '../navigation/RootNavigation';
import {
  getMoviesPopular,
  getMoviesTopRated,
  getMoviesNowPlaying,
  getMoviesUpcoming,
} from '../redux/slice/moviesSlice/moviesRequests';
import {
  AppDispatch,
  createPopularSelector,
  createNowPlayingSelector,
  createTopRatedSelector,
  createUpcomingSelector,
} from '../redux/store/store';
import MovieItemLargeHorizontal from '../components/MovieItemLargeHorizontal';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({navigation}: NativeStackScreenProps<RootScreens>) => {
  //redux code
  const dispatch = useDispatch<AppDispatch>();
  const nowPlayingMovies = useSelector(createNowPlayingSelector);
  const topRatedMovies = useSelector(createTopRatedSelector);
  const popularMovies = useSelector(createPopularSelector);
  const upcomingMovies = useSelector(createUpcomingSelector);

  //React Hooks
  useEffect(() => {
    dispatch(getMoviesPopular());
    dispatch(getMoviesTopRated());
    dispatch(getMoviesNowPlaying());
    dispatch(getMoviesUpcoming());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={backgroundColor}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {upcomingMovies.loading ? (
          <ScreenLoadingComponent />
        ) : (
          <ScrollView>
            <View style={[styles.headingRow, {marginTop: 15}]}>
              <Text style={styles.headingText}>Popular</Text>
              <Pressable
                style={styles.rowButton}
                onPress={() =>
                  navigation.navigate('SectionScreen', {title: 'Popular'})
                }>
                <Text style={styles.rowButText}>ALL</Text>
              </Pressable>
            </View>

            <FlatList
              data={popularMovies.data.results}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.listStyle}
              renderItem={item => (
                <MovieItem
                  title={item.item.title}
                  image={item.item.poster_path}
                  onPress={() => {
                    navigation.navigate('DetailScreen', item.item);
                  }}
                />
              )}
            />

            <View style={styles.headingRow}>
              <Text style={styles.headingText}>Top Rated</Text>
              <Pressable
                style={styles.rowButton}
                onPress={() =>
                  navigation.navigate('SectionScreen', {title: 'Top Rated'})
                }>
                <Text style={styles.rowButText}>ALL</Text>
              </Pressable>
            </View>
            <FlatList
              data={topRatedMovies.data.results}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.listStyle}
              renderItem={item => (
                <MovieItem
                  title={item.item.title}
                  image={item.item.poster_path}
                  onPress={() => {
                    navigation.navigate('DetailScreen', item.item);
                  }}
                />
              )}
            />
            <Text style={styles.headingText}>Now Playing</Text>
            <FlatList
              data={nowPlayingMovies.data.results}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.listStyle}
              renderItem={item => (
                <MovieItemLargeHorizontal
                  title={item.item.title}
                  overview={item.item.overview}
                  bannerPath={item.item.backdrop_path}
                  posterPath={item.item.poster_path}
                  onPress={() => {
                    navigation.navigate('DetailScreen', item.item);
                  }}
                />
              )}
            />
            <View style={styles.headingRow}>
              <Text style={styles.headingText}>Upcoming</Text>
              <Pressable
                style={styles.rowButton}
                onPress={() =>
                  navigation.navigate('SectionScreen', {title: 'Upcoming'})
                }>
                <Text style={styles.rowButText}>ALL</Text>
              </Pressable>
            </View>
            <FlatList
              data={upcomingMovies.data.results}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.listStyle}
              renderItem={item => (
                <MovieItem
                  title={item.item.title}
                  image={item.item.poster_path}
                  onPress={() => {
                    navigation.navigate('DetailScreen', item.item);
                  }}
                />
              )}
            />
          </ScrollView>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '85%',
    color: fontColorWhite,
    paddingLeft: 15,
    fontFamily: 'nunito-variable',
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: fontColorWhite,
    paddingLeft: 15,
    width: '85%',
    fontFamily: 'nunito-variable',
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listStyle: {
    paddingLeft: 15,
  },
  rowButton: {
    paddingVertical: 2.5,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  rowButText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 14,
  },
});
