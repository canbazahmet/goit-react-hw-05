import { Suspense, useEffect, useRef, useState } from "react";
import { NavLink, useParams, Outlet, Link, useLocation } from "react-router";
import { fetchMovieById } from "../../services/tmdbApi";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import clsx from "clsx";

import css from "./MovieDetailsPage.module.css";

const getLinkStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state);

  useEffect(() => {
    async function getMovie() {
      try {
        setLoading(true);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getMovie();
  }, [movieId]);

  return (
    <div>
      <Link to={backLinkRef.current}>Go back</Link>

      {isLoading && <b>Loading info...</b>}
      {error && <b>Whoops there was an error, please reload the page...</b>}
      {movie && <MovieDetails movie={movie} />}

      <ul className={css.list}>
        <p>Additional information</p>
        <li>
          <NavLink to="cast" className={getLinkStyles}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={getLinkStyles}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={"Loading page..."}>
        <Outlet />
      </Suspense>
    </div>
  );
}
