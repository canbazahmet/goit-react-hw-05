import { useEffect, useState } from "react";
import { fetchTopMovies } from "../../services/tmdbApi";
import MovieTopList from "../../components/MovieList/MovieList";

import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function getTopMovies() {
      try {
        setIsloading(true);
        setError(false);
        const data = await fetchTopMovies();
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setIsloading(false);
      }
    }

    getTopMovies();
  }, []);
  return (
    <div className={css.container}>
      <h2>Trending today</h2>
      {isLoading && <b>Loading movies...</b>}
      {error && <b>Whoops there was an error, plz reload the page...</b>}
      {movies.length > 0 && <MovieTopList movies={movies} />}
    </div>
  );
}
