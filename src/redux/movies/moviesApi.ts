import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse, Genre, Movie } from './movies.types';
import instance from '../../services/axiosInstance';

export const getPopularMovies = createAsyncThunk<
  Movie[],
  void,
  { rejectValue: ErrorResponse }
>('movies/getPopularMovies', async (_, thunkApi) => {
  try {
    const { data } = await instance.get('/movie/popular');
    return data.results;
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
