import { Link, useLocation } from "react-router";
import css from "./MovieList.module.css";

export default function MovieTopList({ movies }) {
  const location = useLocation();
  const urlImg = "https://image.tmdb.org/t/p/w500/";

  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.listItems}>
            <div>
              <Link
                to={`/movies/${movie.id}`}
                className={css.movieName}
                state={location}
              >
                <img
                  src={`${urlImg}${movie.poster_path}`}
                  alt={movie.original_title}
                  className={css.poster}
                />
                {movie.title}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
