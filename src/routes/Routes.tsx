import type { RouteObject } from 'react-router-dom';
import { Home } from '../pages/Home';
// Nuevas páginas para películas
import { Movies } from '../pages/Movies';
import { Recommendations } from '../pages/Recommendations';
import { Admin } from '../pages/Admin';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/movies', element: <Movies /> },
  { path: '/recommendations', element: <Recommendations /> },
  { path: '/admin', element: <Admin /> },
];

export default routes;