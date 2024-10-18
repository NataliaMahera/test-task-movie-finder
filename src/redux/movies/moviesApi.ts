import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse, Genre, Movie, MoviesResponse } from './movies.types';
import instance from '../../services/axiosInstance';

export const getPopularMovies = createAsyncThunk<
  MoviesResponse,
  number,
  { rejectValue: ErrorResponse }
>('movies/getPopularMovies', async (currentPage, thunkApi) => {
  try {
    const { data } = await instance.get('/movie/popular', {
      params: {
        page: currentPage,
      },
    });
    return { results: data.results, total_pages: data.total_pages };
  } catch (error) {
    const message = (error as Error).message || 'An error occurred';
    return thunkApi.rejectWithValue({ message });
  }
});

export const getGenres = createAsyncThunk<
  Genre[],
  void,
  { rejectValue: ErrorResponse }
>('movies/getGenres', async (_, thunkApi) => {
  try {
    const { data } = await instance.get('/genre/movie/list');
    return data.genres;
  } catch (error) {
    const message = (error as Error).message || 'An error occurred';
    return thunkApi.rejectWithValue({ message });
  }
});

export const searchMovies = createAsyncThunk<
  MoviesResponse,
  { query: string; page: number },
  { rejectValue: ErrorResponse }
>('movies/searchMovies', async ({ query, page }, thunkApi) => {
  try {
    const { data } = await instance.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
      },
    });
    return { results: data.results, total_pages: data.total_pages };
  } catch (error) {
    const message = (error as Error).message || 'An error occurred';
    return thunkApi.rejectWithValue({ message });
  }
});

export const getMovieRecommendations = createAsyncThunk<
Movie[],
string,
{ rejectValue: ErrorResponse }
>(
  'movies/getMovieRecommendations',
  async (movieId: string, thunkApi) => {
    try {
      const { data } = await instance.get(`movie/${movieId}/recommendations`);
      return data.results; 
    } catch (error) {
      const message = (error as Error).message || 'An error occurred';
      alert(`Error fetching movie recommendations: ${message}`);
      return thunkApi.rejectWithValue({ message });
    }
  }
);
