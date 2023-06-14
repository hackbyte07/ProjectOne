import {Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootScreens} from '../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/AntDesign';
import {fontColorWhite, primaryColor} from '../assets/colors/colors';
import {initialStateType} from '../redux/slice/moviesSlice/moviesPopular';
import {createNowPlayingSelector, createPopularSelector, createTopRatedSelector, createUpcomingSelector} from '../redux/store/store';
import {useSelector} from 'react-redux';
import MovieItemLargeVertical from '../components/MovieItemLargeVertical';


const {width} = Dimensions.get('screen')

const SectionScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootScreens, 'SectionScreen'>) => {

    

  const movies: () => initialStateType = useCallback(() => {
    const title = route.params.title;
    if (title === 'Now Playing') {
      return useSelector(createNowPlayingSelector);
    } else if (title === 'Top Rated') {
      return useSelector(createTopRatedSelector);
    } else if (title === 'Popular') {
      return useSelector(createPopularSelector);
    } else {
      return useSelector(createUpcomingSelector);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appRowContainer}>
        <Icon name="arrowleft" size={25} onPress={() => navigation.pop()} color={'white'}/>
        <Text style={styles.heading}>{route.params.title}</Text>
      </View>
      <FlatList
        data={movies().data.results}
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
    </SafeAreaView>
  );
};

export default SectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  appRowContainer: {
    flexDirection: 'row',
    width,
    padding: 15,
    alignItems: 'center'
  },
  listContentStyle: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: fontColorWhite,
    marginLeft: '30%'
  }
});
