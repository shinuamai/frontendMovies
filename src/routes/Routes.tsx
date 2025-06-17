
import type { RouteObject } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Movies } from '../pages/Movies';


const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/movies', element: <Movies /> },
];

export default routes;