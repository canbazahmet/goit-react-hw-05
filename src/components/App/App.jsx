import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import Navigation from "../Navigation/Navigation";

import css from "./App.css";

const HomePages = lazy(() => import("../../pages/HomePage"));

function App() {
  return (
    <div className={css.container}>
      <Navigation />

      <Suspense fallback={"Loading page..."}>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
