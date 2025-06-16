
import type { RouteObject } from 'react-router-dom';
import { Home } from '../pages/Home';
import { About } from '../pages/About';


const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
];

export default routes;