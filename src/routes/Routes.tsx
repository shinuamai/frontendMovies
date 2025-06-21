import type { RouteObject } from "react-router-dom";
import { Home } from "../pages/Home";
// Nuevas páginas para películas
import { Movies } from "../pages/Movies";
import { Recommendations } from "../pages/Recommendations";
import { TopRecommendations } from "../pages/TopRecommendations";
import { MovieView } from "../pages/MovieView";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/movies", element: <Movies /> },
  { path: "/recommendations", element: <Recommendations /> },
  { path: "/top-recommendations", element: <TopRecommendations /> },
  { path: "/movie/trailer/:id", element: <MovieView /> },
];

export default routes;
