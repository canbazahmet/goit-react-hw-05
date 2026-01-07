import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import Navigation from "../Navigation/Navigation";

import "./App.css";

const HomePage = lazy(() => import("../../pages/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);

function App() {
  return (
    <div className="container">
      <Navigation />

      <Suspense fallback={"Loading page..."}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
