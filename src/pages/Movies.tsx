// src/pages/Movies.tsx
import { useState, useEffect } from 'react';
import { mockMovies } from '../data';
import type { Movie } from '../types';

export const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setMovies(mockMovies);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl">Cargando películas...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Catálogo de Películas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie.idMovie} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={movie.image} 
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
              <p className="text-gray-600 mb-2">Director: {movie.author}</p>
              <p className="text-sm text-gray-500 mb-2">Género: {movie.genere}</p>
              <p className="text-gray-700 text-sm">{movie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
