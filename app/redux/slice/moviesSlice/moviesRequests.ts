import {createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';

type MoviesResult = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type MoviesObject = {
  page: number;
  results: MoviesResult[];
  total_pages: number;
  total_results: number;
};

const ImageUrl = 'https://image.tmdb.org/t/p/original/';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODJjYzQ0M2U5NWRkY2I3OWJjZDk2NGQyM2ZlMDEwOCIsInN1YiI6IjYzMjZhNzIyY2JhMzZmMDA3ZDgwYTI4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jDmva5j2E2E0cIB-6lMUXh-gTvxmTWZG2tMLYZZm_cs',
  },
};

const BaseUrl = 'https://api.themoviedb.org/3/';

const getMoviesNowPlaying = createAsyncThunk('movies/nowPlaying', async () => {
  const response = await axios.get(BaseUrl + 'movie/now_playing', options);
  const data = response.data as MoviesObject;
  console.log(data);
  return data;
});

const getMoviesTopRated = createAsyncThunk('movies/topRated', async () => {
  const response = await axios.get(BaseUrl + 'movie/top_rated', options);
  const data = response.data as MoviesObject;
  console.log(data);
  return data;
});

const getMoviesPopular = createAsyncThunk('movies/popular', async () => {
  const response = await axios.get(BaseUrl + 'movie/popular', options);
  const data = response.data as MoviesObject;
  console.log(data);
  return data;
});

const getMoviesUpcoming = createAsyncThunk('movies/upcoming', async () => {
  const response = await axios.get(BaseUrl + 'movie/upcoming', options);
  const data = response.data as MoviesObject;
  console.log(data);
  return data;
});

//'https://api.themoviedb.org/3/movie/667538/similar?language=en-US&page=1'

const getMoviesSimilar = createAsyncThunk('movies/similar', async (movieId: number) => {
  const response = await axios.get(BaseUrl + `movie/${movieId}/similar`, options);
  const data = response.data as MoviesObject;
  console.log(data);
  return data;
});

//'https://api.themoviedb.org/3/search/movie?query

const getSearchMovies = createAsyncThunk(
  'movies/search',
  async (query: string) => {
    const response = await axios.get(BaseUrl + 'search/movie', {
      ...options,
      params: {
        query,
      },
    });
    const data = response.data as MoviesObject;
    console.log(data);
    return data;
  },
);

//Movies Video data and api
type VideoResult = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

type VideoObject = {
  id: number;
  results: VideoResult[];
};

//--url 'https://api.themoviedb.org/3/movie/1111140/videos?language=en-US' \
// --url 'https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US' \

const getMoviesVideo = createAsyncThunk(
  'videos/movie',
  async (movieId: number) => {
    const response = await axios.get(
      BaseUrl + `movie/${movieId}/videos?language=en-US`,
      options,
    );
    const data = response.data as VideoObject;
    console.log(data);

    return data;
  },
);

export type {MoviesObject, MoviesResult, VideoObject, VideoResult};

export {
  ImageUrl,
  getMoviesNowPlaying,
  getMoviesTopRated,
  getSearchMovies,
  getMoviesPopular,
  getMoviesUpcoming,
  getMoviesVideo,
  getMoviesSimilar,
};
