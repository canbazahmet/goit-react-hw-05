import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchByQuery } from "../../services/tmdbApi";
import { useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";

import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const [wasSearched, setWasSearched] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [debouncedQuery] = useDebounce(query, 800);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.query.value.trim();
    setSearchParams({ query: value });
  };

  useEffect(() => {
    async function getMoviesByQuery() {
      if (!debouncedQuery) {
        setMovies([]);
        setWasSearched(false);
        return;
      }

      try {
        setIsloading(true);
        setError(false);
        const data = await fetchByQuery(debouncedQuery);
        setMovies(data);
        setWasSearched(true);
      } catch {
        setError(true);
      } finally {
        setIsloading(false);
      }
    }

    getMoviesByQuery();
  }, [debouncedQuery]);

  return (
    <div className={css.searchBox}>
      <form className={css.formBox} onSubmit={handleSubmit}>
        <input
          className={css.searchBoxField}
          name="query"
          defaultValue={query}
        />
        <button type="submit">Search</button>
      </form>
      <div className={css.container}>
        {isLoading && <b>Loading movies...</b>}
        {error && <b>Whoops there was error, please reload page...</b>}
        {movies.length > 0 && <MovieList movies={movies} />}
        {wasSearched && !isLoading && !error && movies.length === 0 && (
          <b>SORRY, nothing found...</b>
        )}
      </div>
    </div>
  );
}
