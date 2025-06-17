// src/pages/Recommendations.tsx
import { useState, useEffect } from 'react';
import { mockRecommendations, mockMovies } from '../data';
import type { Recommendation } from '../types';

export const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1000);
  }, []);

  const getMovieTitle = (peliculaId: number) => {
    const movie = mockMovies.find(m => m.idMovie === peliculaId);
    return movie?.title || 'Película no encontrada';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl">Cargando recomendaciones...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Mis Recomendaciones</h1>
      
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div 
            key={rec.id} 
            className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
              rec.visualizada ? 'border-green-500' : 'border-red-500'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{getMovieTitle(rec.peliculaId)}</h3>
                <p className="text-gray-700 mb-2">{rec.razonRecomendacion}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Puntuación predicha: {rec.puntuacionPredicha}/5</span>
                  <span>Usuario: {rec.usuarioId}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  rec.visualizada 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {rec.visualizada ? 'Visualizada' : 'Pendiente'}
                </span>
                <span className="text-xs text-gray-400 mt-2">
                  {new Date(rec.fechaRecomendacion).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};