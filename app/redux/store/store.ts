import {
  combineReducers,
  configureStore,
  createSelector,
} from '@reduxjs/toolkit';
import {getMoviesNowPlayingReducer} from '../slice/moviesSlice/moviesNowPlaying';
import {moviesUpcomingReducer} from '../slice/moviesSlice/moviesUpcoming';
import {moviesPopularReducer} from '../slice/moviesSlice/moviesPopular';
import {
  initialStateVideosType,
  moviesVideoReducer,
} from '../slice/moviesSlice/moviesVideo';
import {initialStateType} from '../slice/moviesSlice/moviesPopular';
import {moviesTopRatedReducer} from '../slice/moviesSlice/moviesTopRated';
import {searchMoviesReducer} from '../slice/moviesSlice/moviesSearch';
import {moviesSimilarReducer} from '../slice/moviesSlice/moviesSimilar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

const moviesReducer = combineReducers({
  getMoviesNowPlayingReducer,
  moviesTopRatedReducer,
  searchMoviesReducer,
  moviesUpcomingReducer,
  moviesPopularReducer,
  moviesVideoReducer,
  moviesSimilarReducer,
});

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});



//selectors
const createNowPlaying: (state: RootState) => initialStateType = state =>
  state.movies.getMoviesNowPlayingReducer;
const createNowPlayingSelector = createSelector(
  createNowPlaying,
  state => state,
);

const createTopRated: (state: RootState) => initialStateType = state =>
  state.movies.moviesTopRatedReducer;
const createTopRatedSelector = createSelector(createTopRated, state => state);

const createPopular: (state: RootState) => initialStateType = state =>
  state.movies.moviesPopularReducer;
const createPopularSelector = createSelector(createPopular, state => state);

const createUpcoming: (state: RootState) => initialStateType = state =>
  state.movies.moviesUpcomingReducer;
const createUpcomingSelector = createSelector(createUpcoming, state => state);

const createSimilar: (state: RootState) => initialStateType = state =>
  state.movies.moviesSimilarReducer;

const createSimilarSelector = createSelector(createSimilar, state => state);

const createSearchMovies: (state: RootState) => initialStateType = state =>
  state.movies.searchMoviesReducer;
const createSearchMoviesSelector = createSelector(
  createSearchMovies,
  state => state,
);

const createVideo: (state: RootState) => initialStateVideosType = state =>
  state.movies.moviesVideoReducer;
const createVideoSelector = createSelector(createVideo, state => state);


export {
  createNowPlayingSelector,
  createTopRatedSelector,
  createPopularSelector,
  createUpcomingSelector,
  createSearchMoviesSelector,
  createVideoSelector,
  createSimilarSelector,
};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
