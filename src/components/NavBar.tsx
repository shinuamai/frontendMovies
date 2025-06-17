import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-red-600 hover:text-red-500 transition-colors">
            🎬 MovieRecommend
          </Link>
          
          {/* Navigation Links */}
          <div className="flex gap-6">
            <Link 
              to="/" 
              className="hover:text-red-400 transition-colors font-medium px-3 py-2 rounded"
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className="hover:text-red-400 transition-colors font-medium px-3 py-2 rounded"
            >
              Películas
            </Link>
            <Link 
              to="/recommendations" 
              className="hover:text-red-400 transition-colors font-medium px-3 py-2 rounded"
            >
              Recomendaciones
            </Link>
            <Link 
              to="/admin" 
              className="hover:text-red-400 transition-colors font-medium px-3 py-2 rounded"
            >
              Admin
            </Link>
            <Link 
              to="/about" 
              className="hover:text-red-400 transition-colors font-medium px-3 py-2 rounded"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
