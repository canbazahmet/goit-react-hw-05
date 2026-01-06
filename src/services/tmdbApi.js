import axios from "axios";

const url = "https://api.themoviedb.org/3/";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjJhMWJhZjM0MTkwMzZkODc2NmIyZjVhYzIxZDg3ZSIsIm5iZiI6MTc2NzczNDU1Mi42ODksInN1YiI6IjY5NWQ3ZDE4MmIyZTNhNGQ3OTI0ZDQwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TgDKoTxSdYBOckG6xxl0kxoEeTbWlb68a3spt1Bdq9U",
  },
};

//https://api.themoviedb.org/3/trending/movie/day
export const fetchTopMovies = async () => {
  const resp = await axios.get(`${url}/trending/movie/day?page=1`, options);
  return resp.data.results;
};

//https://api.themoviedb.org/3/movie/movie_id
export const fetchMovieById = async (movieId) => {
  const resp = await axios.get(`${url}movie/${movieId}`, options);
  return resp.data;
};

//https://api.themoviedb.org/3/movie/movie_id/credits
export const fetchMovieCast = async (movieId) => {
  const resp = await axios.get(`${url}movie/${movieId}/credits`, options);
  return resp.data.cast;
};

// https://api.themoviedb.org/3/movie/movie_id/reviews
export const fetchMovieReviews = async (movieId) => {
  const resp = await axios.get(`${url}movie/${movieId}/reviews`, options);
  return resp.data.results;
};

//https://api.themoviedb.org/3/search/movie
export const fetchByQuery = async (query) => {
  const resp = await axios.get(
    `${url}search/movie?query=${query}&page=1`,
    options
  );
  return resp.data.results;
};
