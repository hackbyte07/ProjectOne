


// 'https://api.themoviedb.org/3/movie/popular


import {createSlice, combineReducers} from '@reduxjs/toolkit';
import {
  MoviesObject,
  getMoviesNowPlaying,
  getMoviesPopular,
  getMoviesSimilar,
  getMoviesTopRated,
} from './moviesRequests';
import {create} from 'react-test-renderer';
import {RootState} from '../../store/store';

export type initialStateType = {
  loading: boolean;
  data: MoviesObject;
  error: string | undefined;
};

const initialState: initialStateType = {
  loading: false,
  data: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  error: '',
};

const moviesSimilar = createSlice({
  name: 'moviesSimilar',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMoviesSimilar.pending, state => {
      state.loading = true;
      state.data = {page: 0, results: [], total_pages: 0, total_results: 0};
    });
    builder.addCase(getMoviesSimilar.fulfilled, (state, action) => {
      (state.loading = false),
        (state.data = action.payload),
        (state.error = '');
    });

    builder.addCase(getMoviesSimilar.rejected, (state, action) => {
      (state.loading = false),
        (state.data = {page: 0, results: [], total_pages: 0, total_results: 0});
      state.error = action.error.message?.toString();
    });
  },
});

export const moviesSimilarReducer = moviesSimilar.reducer;








