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

  const changeSearchQuery = (event) => {
    const nextParams = new URLSearchParams(searchParams);
    if (event.target.value !== "") {
      nextParams.set("query", event.target.value);
    } else {
      nextParams.delete("query");
    }

    setSearchParams(nextParams);
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
    <div className={css.searchbox}>
      <input
        className={css.searchBoxField}
        type="text"
        value={query}
        onChange={changeSearchQuery}
      />
      <div>
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
