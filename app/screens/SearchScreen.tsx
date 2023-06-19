import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootScreens} from '../navigation/RootNavigation';
import {useState} from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {AppDispatch, createSearchMoviesSelector} from '../redux/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {getSearchMovies} from '../redux/slice/moviesSlice/moviesRequests';

import ScreenLoadingComponent from '../components/ScreenLoadingComponent';
import {
  backgroundColor,
  fontColorWhite,
  secondaryColor,
} from '../assets/colors/colors';
import MovieItemLargeVertical from '../components/MovieItemLargeVertical';
import LinearGradient from 'react-native-linear-gradient';

const SearchScreen = ({navigation}: NativeStackScreenProps<RootScreens>) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [search, setSearch] = useState('');
  const keyBoardRef = useRef<TextInput>(null);

  //redux
  const dispatch = useDispatch<AppDispatch>();
  const searchMovies = useSelector(createSearchMoviesSelector);

  const handleSearchMovies = useCallback(() => {
    const input = search.trim().toLowerCase();

    if (input.length < 1) return;
    else {
      setSearchVisible(true);

      dispatch(getSearchMovies(input));
    }
  }, [search]);

  useEffect(() => {
    setTimeout(() => {
      keyBoardRef.current?.focus();
    }, 250);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.container}
        colors={backgroundColor}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View style={styles.appBarContainer}>
          <Icon
            name="arrowleft"
            size={25}
            style={styles.icon}
            onPress={() => navigation.pop()}
            color={fontColorWhite}
          />
          <View style={styles.textInputContainer}>
            <TextInput
              ref={keyBoardRef}
              style={styles.textInput}
              placeholder="Search..."
              onChangeText={newValue => setSearch(newValue)}
              onChange={handleSearchMovies}
              value={search}
              numberOfLines={1}
              maxLength={50}
              cursorColor={'tomato'}
              placeholderTextColor={fontColorWhite}
              onSubmitEditing={() => handleSearchMovies()}
            />
            <Icon
              name="close"
              size={25}
              color={fontColorWhite}
              onPress={() => setSearch('')}
            />
          </View>
        </View>

        {searchVisible ? (
          <React.Fragment>
            {searchMovies.loading ? (
              <ScreenLoadingComponent />
            ) : (
              <React.Fragment>
                {searchMovies.data.total_results < 1 ? (
                  <Text style={styles.noSearchResultText}>No Result Found</Text>
                ) : (
                  <FlatList
                    data={searchMovies.data.results}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.listContentStyle}
                    renderItem={item => (
                      <MovieItemLargeVertical
                        title={item.item.title}
                        image={item.item.poster_path}
                        onPress={() => {
                          navigation.navigate('DetailScreen', item.item);
                        }}
                      />
                    )}
                  />
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <View style={styles.lottieViewContainer}>
            <AnimatedLottieView
              style={styles.lottieView}
              source={require('../assets/lottie/searching.json')}
              autoPlay
              loop
            />
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  icon: {
    marginHorizontal: 15,
  },
  textInput: {
    fontSize: 18,
    marginLeft: 15,
    width: '80%',
    color: fontColorWhite,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: secondaryColor,
    borderRadius: 25,
    width: '82%',
  },
  lottieViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: '20%',
  },
  lottieView: {
    aspectRatio: 1,
    width: '75%',
  },
  noSearchResultText: {
    fontSize: 24,
    marginTop: '30%',
    alignSelf: 'center',
  },
  listContentStyle: {
    alignItems: 'center',
  },
});
