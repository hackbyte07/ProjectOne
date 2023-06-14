import {createSlice, combineReducers, PayloadAction} from '@reduxjs/toolkit';
import {
  MoviesObject,
  getMoviesNowPlaying,
} from './moviesRequests';
import {create} from 'react-test-renderer';
import {RootState} from '../../store/store';

type initialStateType = {
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

 const moviesNowPlayingSlice = createSlice({
  name: 'moviesNowPlaying',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMoviesNowPlaying.pending, state => {
      state.loading = true;
      state.data = {page: 0, results: [], total_pages: 0, total_results: 0};
    });
    builder.addCase(getMoviesNowPlaying.fulfilled, (state, action) => {
      (state.loading = false),
        (state.data = action.payload),
        (state.error = '');
    });

    builder.addCase(getMoviesNowPlaying.rejected, (state, action) => {
      (state.loading = false),
        (state.data = {page: 0, results: [], total_pages: 0, total_results: 0});
      state.error = action.error.message?.toString();
    });
  },
});

export const {} = moviesNowPlayingSlice.actions;

export const getMoviesNowPlayingReducer = moviesNowPlayingSlice.reducer;
