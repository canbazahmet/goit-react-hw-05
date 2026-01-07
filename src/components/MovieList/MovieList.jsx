import { Link, useLocation } from "react-router";
import css from "./MovieList.module.css";

export default function MovieTopList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.listItems}>
          <Link
            to={`/movies/${movie.id}`}
            className={css.movieName}
            state={location}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
