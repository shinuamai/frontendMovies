// src/components/common/Header.tsx
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logotipo */}
          <Link to="/" className="text-2xl font-bold text-red-600 hover:text-red-500 transition-colors">
            🎬 MovieRecommend
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className="hover:text-red-400 transition-colors font-medium"
            >
              Inicio
            </Link>
            <Link 
              to="/movies" 
              className="hover:text-red-400 transition-colors font-medium"
            >
              Películas
            </Link>
            <Link 
              to="/recommendations" 
              className="hover:text-red-400 transition-colors font-medium"
            >
              Recomendaciones
            </Link>
            <Link 
              to="/admin" 
              className="hover:text-red-400 transition-colors font-medium"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;