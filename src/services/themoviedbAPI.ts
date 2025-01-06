import instance from './axiosInstance';

export const getMovieDetails = async (movieId: string) => {
  const { data } = await instance.get(`movie/${movieId}`);
  return data;
};

export const getMovieRecommendations = async (
  movieId: string | undefined,
  page = 1
) => {
  const { data } = await instance.get(`movie/${movieId}/recommendations`, {
    params: { page },
  });
  return {
    results: data.results,
    total_pages: data.total_pages,
    total_results: data.total_results,
  };
};

export const getPopularMovies = async (page: number) => {
  const { data } = await instance.get('/movie/popular', {
    params: {
      page,
    },
  });
  return {
    results: data.results,
    total_pages: data.total_pages,
    total_results: data.total_results,
  };
};

export const getSearchMovies = async (query: string, page: number) => {
  const { data } = await instance.get('/search/movie', {
    params: {
      query,
      page,
      include_adult: false,
    },
  });
  return {
    results: data.results,
    total_pages: data.total_pages,
    total_results: data.total_results,
  };
};

export const getGenres = async () => {
  const { data } = await instance.get('/genre/movie/list');
  return data.genres;
}
