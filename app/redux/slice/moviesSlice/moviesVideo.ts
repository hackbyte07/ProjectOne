import {createSlice} from '@reduxjs/toolkit';
import {VideoObject, getMoviesVideo} from './moviesRequests';

export type initialStateVideosType = {
  loading: boolean;
  data: VideoObject;
  error: string | undefined;
};

const initialState: initialStateVideosType = {
  loading: false,
  data: {id: 0, results: []},
  error: '',
};

const moviesVideoSlice = createSlice({
  name: 'moviesVideo',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMoviesVideo.pending, state => {
      (state.loading = true),
        (state.data = {id: 0, results: []}),
        (state.error = '');
    }),
      builder.addCase(getMoviesVideo.fulfilled, (state, action) => {
        (state.loading = false),
          (state.data = action.payload),
          (state.error = '');
      }),
      builder.addCase(getMoviesVideo.rejected, (state, action) => {
        (state.loading = false),
          (state.data = {id: 0, results: []}),
          (state.error = action.error.message);
      });
  },
});

export const moviesVideoReducer = moviesVideoSlice.reducer;
