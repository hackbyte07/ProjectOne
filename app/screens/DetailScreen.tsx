import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  View,
  FlatList,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootScreens} from '../navigation/RootNavigation';

import {fontColorWhite, primaryColor} from '../assets/colors/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  createSimilarSelector,
  createVideoSelector,
} from '../redux/store/store';
import {useEffect} from 'react';
import {
  ImageUrl,
  MoviesResult,
  getMoviesSimilar,
  getMoviesVideo,
} from '../redux/slice/moviesSlice/moviesRequests';
import Ratings from '../components/details_screen/Ratings';
import FastImage from 'react-native-fast-image';
import ScreenLoadingComponent from '../components/ScreenLoadingComponent';
import VideoItem from '../components/details_screen/VideoItem';
import MovieItem from '../components/MovieItem';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  addMoviesToFavorite,
  deleteFromFavorite,
  moviesCollection,
} from '../firebase/firestore/moviesDb';
import {useState} from 'react';

const {width} = Dimensions.get('screen');

const DetailScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootScreens, 'DetailScreen'>) => {
  const data = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const moviesVideos = useSelector(createVideoSelector);
  const similarMovies = useSelector(createSimilarSelector);

  const [isFavorite, setFavorite] = useState(false);
  useEffect(() => {
    dispatch(getMoviesVideo(data.id));
    dispatch(getMoviesSimilar(data.id));
    const subscriber = moviesCollection.onSnapshot(doc => {
      doc.forEach(result => {
        if (result.id === data.id.toString()) {
          setFavorite(true);
          return;
        }
      });
    });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={{uri: ImageUrl + data.backdrop_path}}
      imageStyle={styles.backImage}>
      <View style={styles.topBar}>
        <Icon
          name="arrowleft"
          size={25}
          color={'white'}
          onPress={() => {
            navigation.pop();
          }}
        />
        {isFavorite ? (
          <Icon
            name="heart"
            size={25}
            color={'tomato'}
            style={styles.iconHeart}
            onPress={() => {
              deleteFromFavorite(data.id).then(result => {
                ToastAndroid.show('Deleted from Favorites', 1000);
                setFavorite(false);
              });
            }}
          />
        ) : (
          <Icon
            name="hearto"
            size={25}
            color={'white'}
            style={styles.iconHeart}
            onPress={() => {
              addMoviesToFavorite(data).then(result => {
                console.log('movies added to favorite');

                ToastAndroid.show('Added to favorites', 1000);
              });
            }}
          />
        )}
      </View>
      <ScrollView style={styles.subContainer}>
        <View style={styles.subContainerChild}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.rowContainer}>
            <FastImage
              source={{uri: ImageUrl + data.poster_path}}
              style={styles.posterImage}
            />
            <View style={styles.rowContainerChild}>
              <Text style={styles.originalTitle}>
                {`Original Title:- ${data.original_title}`}
              </Text>
              <View style={styles.langRow}>
                <Ratings rating={data.vote_average} />
                <View style={styles.langView}>
                  <Text style={styles.lang}>
                    {data.original_language.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={styles.releaseDate}>
                {'Release Date:- ' + data.release_date}
              </Text>
            </View>
          </View>
          <Text
            style={styles.overview}>{`OverView: - \n ${data.overview}`}</Text>

          {moviesVideos.loading ? (
            <ScreenLoadingComponent />
          ) : moviesVideos.data.results.length > 0 ? (
            <View>
              <Text style={styles.trailerHeader}>Clips and Trailer...</Text>
              <FlatList
                data={moviesVideos.data.results}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.trailerListContainer}
                renderItem={item => (
                  <VideoItem
                    name={item.item.name}
                    type={item.item.type}
                    site={item.item.site}
                    imageKey={item.item.key}
                    onPress={() =>
                      navigation.navigate('YoutubeVideoScreen', {
                        key: item.item.key,
                      })
                    }
                  />
                )}
              />
            </View>
          ) : (
            <Text style={styles.noClips}>No videos and clips available</Text>
          )}

          <View>
            <Text style={styles.trailerHeader}>Similar Movies</Text>
            <FlatList
              data={similarMovies.data.results}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.trailerListContainer}
              renderItem={item => (
                <MovieItem
                  title={item.item.title}
                  image={item.item.poster_path}
                  onPress={() => navigation.push('DetailScreen', item.item)}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36373B',
  },
  topBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    padding: 15,
  },
  iconHeart: {
    marginLeft: '80%',
  },
  backImage: {
    height: '30%',
  },
  subContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  subContainerChild: {
    flex: 1,
    paddingTop: '5%',
  },
  title: {
    marginHorizontal: 15,
    fontSize: 22,
    fontWeight: 'bold',
    color: fontColorWhite,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  posterImage: {
    height: 200,
    borderRadius: 10,
    width: width / 3,
  },
  originalTitle: {
    fontSize: 18,
    color: fontColorWhite,
    fontWeight: '500',
  },
  rowContainerChild: {
    flex: 1,
    paddingLeft: 15,
  },
  langView: {
    borderWidth: 5,
    borderColor: '#2FF924',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    paddingHorizontal: 10,
    height: 45,
  },
  lang: {
    fontSize: 18,
    fontWeight: 'bold',
    color: fontColorWhite,
  },
  langRow: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
  },
  overview: {
    fontSize: 16,
    color: fontColorWhite,
    paddingHorizontal: 15,
    textAlign: 'justify',
    lineHeight: 25,
  },
  releaseDate: {
    fontSize: 16,
    color: fontColorWhite,
  },
  trailerListContainer: {
    paddingHorizontal: 7.5,
    marginVertical: 15,
  },
  trailerHeader: {
    fontSize: 18,
    color: fontColorWhite,
    marginTop: 15,
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
  noClips: {
    fontSize: 18,
    color: fontColorWhite,
    paddingLeft: 15,
  },
});
