import { useEffect, useState } from "react";
import { fetchTopMovies } from "../services/tmdbApi";
import MovieTopList from "../components/MovieList/MovieList";

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
    <div>
      <h1>Trending today- TOP 20</h1>
      {isLoading && <b>Loading moies...</b>}
      {error && <b>Whoops there was an error, plz reload the page...</b>}
      {movies.length > 0 && <MovieTopList movies={movies} />}
    </div>
  );
}
