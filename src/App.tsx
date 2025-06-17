
import { useRoutes } from 'react-router-dom';
import './App.css'
import routes from './routes/Routes';
import { Navbar } from './components/common/NavBar';

export const App = () => {
  const element = useRoutes(routes);
  return (
    <div>
      <Navbar/>
      {element}
    </div>
  );
};