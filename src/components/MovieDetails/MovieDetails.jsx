import css from "./MovieDetails.module.css";

export default function MovieDetailInfo({ movie }) {
  const urlImg = "https://image.tmdb.org/t/p/w500/";

  return (
    <div className={css.detailWrapper}>
      <img
        src={`${urlImg}${movie.poster_path}`}
        alt={movie.original_title}
        className={css.poster}
      />
      <div className={css.movieInfo}>
        <h2 className={css.title}>
          {movie.title} ({movie.release_date.slice(0, 4)})
        </h2>
        <p className={css.parag}>Raiting: {movie.vote_average} / 10.0</p>
        <h3>Overview</h3>
        <p className={css.parag}>{movie.overview}</p>
        <h4>Genres:</h4>
        <p className={css.parag}>
          {movie.genres.map((genre) => genre.name).join(" ")}
        </p>
      </div>
    </div>
  );
}
