import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchMovieCast } from "../../services/tmdbApi";

import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCasts() {
      try {
        setLoading(true);
        const data = await fetchMovieCast(movieId);
        setCasts(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getCasts();
  }, [movieId]);
  return (
    <div className={css.container}>
      {isLoading && <b>Loading info...</b>}
      {error && <b>Whoops there was an error, plz reload the page...</b>}

      {casts.length > 0 && <p>{casts.map((cast) => cast.name).join(", ")}</p>}
      {casts.length === 0 && <p>We don't have any information about cast</p>}
    </div>
  );
}
