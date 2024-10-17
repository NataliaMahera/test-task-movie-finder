import instance from "./axiosInstance";

export const getMovieDetails = async (movieId: string) => {
    const { data } = await instance.get(
      `movie/${movieId}`
    );
    return data;
  };

export const getMovieRecommendations = async (movieId: string | undefined, page = 1) => {
    const { data } = await instance.get(
      `movie/${movieId}/recommendations`,
      { params: { page } } 
    );
    console.log(data);
    return {
      results: data.results,
      total_pages: data.total_pages,
      total_results: data.total_results,
    };
  };
  