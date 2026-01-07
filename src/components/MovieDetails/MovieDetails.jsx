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
        <h1 className={css.title}>{movie.title}</h1>
        <p>Release date: {movie.release_date}</p>
        <h3>Overview</h3>
        <p>{movie.overview}</p>
        <h3>Genres:</h3>
        <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        <p>Raiting: {movie.vote_average} / 10.0</p>
      </div>
    </div>
  );
}
