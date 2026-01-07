import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import Navigation from "../Navigation/Navigation";

import css from "./App.css";

const HomePages = lazy(() => import("../../pages/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);

function App() {
  return (
    <div className={css.container}>
      <Navigation />

      <Suspense fallback={"Loading page..."}>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
