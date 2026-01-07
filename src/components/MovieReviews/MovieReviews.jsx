import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../services/tmdbApi";

import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        setLoading(true);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getReviews();
  }, [movieId]);
  return (
    <div className={css.container}>
      {isLoading && <b>Loading info...</b>}
      {error && <b>Whoops there was an error, plz reload the page...</b>}

      {reviews.length > 0 && (
        <ul className={css.list}>
          {reviews.map((review) => (
            <li key={review.id} className={css.listItems}>
              <h4>Author: {review.author_details.username}</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews.length === 0 && <p>We don't have any reviews for this movie</p>}
    </div>
  );
}
