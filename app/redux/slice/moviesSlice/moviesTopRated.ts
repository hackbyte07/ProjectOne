import {createSlice, combineReducers} from '@reduxjs/toolkit';
import {
  MoviesObject,
  getMoviesNowPlaying,
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

const moviesTopRated = createSlice({
  name: 'moviesTopRated',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMoviesTopRated.pending, state => {
      state.loading = true;
      state.data = {page: 0, results: [], total_pages: 0, total_results: 0};
    });
    builder.addCase(getMoviesTopRated.fulfilled, (state, action) => {
      (state.loading = false),
        (state.data = action.payload),
        (state.error = '');
    });

    builder.addCase(getMoviesTopRated.rejected, (state, action) => {
      (state.loading = false),
        (state.data = {page: 0, results: [], total_pages: 0, total_results: 0});
      state.error = action.error.message?.toString();
    });
  },
});

export const moviesTopRatedReducer = moviesTopRated.reducer;
