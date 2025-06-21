import { useState, useEffect } from 'react';
import { recommendationBackendService } from '../services/recommendationBackendService';
import { mockMovies } from '../data';
import type { Recommendation } from '../types';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { RecomendationModal } from '../components/modals/RecomendationModal';

interface GroupedRecommendation extends Recommendation {
  totalRecommendations: number; 
  allRecommendationIds: number[]; 
}

export const TopRecommendations = () => {
  const [topRecommendations, setTopRecommendations] = useState<GroupedRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [minScore, setMinScore] = useState<number>(4.0);
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const [recommendationToEdit, setRecommendationToEdit] = useState<Recommendation | null>(null);

  
  const groupRecommendationsByMovie = (recommendations: Recommendation[]): GroupedRecommendation[] => {
    const movieGroups: Record<number, Recommendation[]> = {};

    
    recommendations.forEach(rec => {
      if (!movieGroups[rec.peliculaId]) {
        movieGroups[rec.peliculaId] = [];
      }
      movieGroups[rec.peliculaId].push(rec);
    });


    const groupedResults: GroupedRecommendation[] = [];

    Object.values(movieGroups).forEach(movieRecs => {
      const bestRecommendation = movieRecs.reduce((best, current) => 
        (current.puntuacionPredicha || 0) > (best.puntuacionPredicha || 0) ? current : best
      );

    
      const grouped: GroupedRecommendation = {
        ...bestRecommendation,
        totalRecommendations: movieRecs.length,
        allRecommendationIds: movieRecs.map(r => r.id)
      };

      groupedResults.push(grouped);
    });


    return groupedResults.sort((a, b) => (b.puntuacionPredicha || 0) - (a.puntuacionPredicha || 0));
  };

  useEffect(() => {
    const loadTopRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`🏆 Loading top recommendations (min score: ${minScore})...`);
        
        
        const topRecs = await recommendationBackendService.getTopRecommendations(1, minScore);
        
        
        const groupedRecs = groupRecommendationsByMovie(topRecs);
        
        setTopRecommendations(groupedRecs);
        console.log(`✅ Loaded ${topRecs.length} recommendations, grouped into ${groupedRecs.length} unique movies`);
        
      } catch (err: any) {
        console.error('❌ Error loading top recommendations:', err);
        setError('Error al cargar top recomendaciones. Verifica que el backend esté ejecutándose.');
        setTopRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    loadTopRecommendations();
  }, [minScore]);

  const getMovieDetails = (peliculaId: number) => {
    const movie = mockMovies.find(m => m.idMovie === peliculaId);
    return {
      title: movie?.title || `Película ID: ${peliculaId}`,
      genre: movie?.genere || 'N/A',
      image: movie?.image || '/placeholder-movie.jpg'
    };
  };

  const handleEdit = (rec: GroupedRecommendation) => {
    setRecommendationToEdit(rec);
    setShowRecommendModal(true);
  };

  const handleToggleViewed = async (id: number, currentStatus: boolean) => {
    setUpdatingItems(prev => new Set(prev).add(id));
    try {
      const newStatus = !currentStatus;
      const currentRec = topRecommendations.find(r => r.id === id);
      
      if (!currentRec) {
        throw new Error('Recomendación no encontrada');
      }

      const updatePayload = {
        id: currentRec.id,
        usuarioId: currentRec.usuarioId,
        peliculaId: currentRec.peliculaId,
        razonRecomendacion: currentRec.razonRecomendacion,
        puntuacionPredicha: currentRec.puntuacionPredicha,
        visualizada: newStatus,
        fechaRecomendacion: currentRec.fechaRecomendacion
      };

      await recommendationBackendService.update(id, updatePayload);
      
      setTopRecommendations(prev => 
        prev.map(rec => 
          rec.id === id ? { ...rec, visualizada: newStatus } : rec
        )
      );
      
      console.log(`✅ Recommendation ${id} status updated to ${newStatus ? 'viewed' : 'pending'}`);
      setError(null);
      
    } catch (err: any) {
      console.error('❌ Error toggling viewed status:', err);
      setError(`Error al cambiar estado: ${err.message || 'Error desconocido'}`);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta recomendación?')) {
      return;
    }

    setUpdatingItems(prev => new Set(prev).add(id));
    try {
      await recommendationBackendService.delete(id);
      setTopRecommendations(prev => prev.filter(rec => rec.id !== id));
      console.log(`✅ Recommendation ${id} deleted successfully`);
      setError(null);
    } catch (err: any) {
      console.error('❌ Error deleting recommendation:', err);
      setError(`Error al eliminar recomendación: ${err.message || 'Error desconocido'}`);
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleRecommendationUpdate = (updated: Recommendation) => {
    if (recommendationToEdit) {
      setTopRecommendations(prev => 
        prev.map(rec => rec.id === updated.id ? { ...rec, ...updated } : rec)
      );
    } else {
      if (updated.puntuacionPredicha && updated.puntuacionPredicha >= minScore) {
        
        window.location.reload();
      }
    }
    setRecommendationToEdit(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl">Cargando top recomendaciones...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <div className="flex justify-between items-center">
            <span><strong>Error:</strong> {error}</span>
            <button 
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            🏆 Top Películas Recomendadas
          </h1>
          <p className="text-gray-600 mt-2">
            Las mejores películas recomendadas
          </p>
        </div>
        <div className="text-sm text-gray-500">
          <div>Usuario ID: 1</div>
          <div>Películas únicas: {topRecommendations.length}</div>
        </div>
      </div>

      {/* Filtro de Puntuación */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <label className="font-semibold text-gray-700">
            Puntuación mínima:
          </label>
          <div className="flex gap-2">
            {[3.0, 3.5, 4.0, 4.5, 4.8].map(score => (
              <button
                key={score}
                onClick={() => setMinScore(score)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  minScore === score
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                disabled={loading}
              >
                {score}⭐
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            ({topRecommendations.length} películas únicas)
          </div>
        </div>
      </div>

      {/* Lista de Top Recomendaciones */}
      {topRecommendations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="text-gray-500 text-lg mb-4">
            📭 No hay películas con puntuación ≥ {minScore}
          </div>
          <div className="text-sm text-gray-400 mb-4">
            Prueba reduciendo la puntuación mínima o crea más recomendaciones
          </div>
          <button
            onClick={() => setShowRecommendModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Crear Nueva Recomendación
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {topRecommendations.map((rec, index) => {
            const movieDetails = getMovieDetails(rec.peliculaId);
            return (
              <div 
                key={rec.id} 
                className={`bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition-all ${
                  updatingItems.has(rec.id) ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Ranking Badge */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-yellow-600' : 'bg-blue-500'
                    }`}>
                      #{index + 1}
                    </div>
                  </div>

                  {/* Movie Image */}
                  <div className="flex-shrink-0">
                    <img 
                      src={movieDetails.image} 
                      alt={movieDetails.title}
                      className="w-16 h-24 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-movie.jpg';
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 mr-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {movieDetails.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-yellow-500">
                          ⭐ {rec.puntuacionPredicha?.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-2">
                      🎭 {movieDetails.genre} • 📅 {new Date(rec.fechaRecomendacion).toLocaleDateString()}
                    </div>
                    
                    <p className="text-gray-700 mb-3">
                      {rec.razonRecomendacion}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-gray-500">
                        <span>ID: {rec.id}</span>
                        <span>👤 Usuario: {rec.usuarioId}</span>
                        {/* MOSTRAR CUÁNTAS RECOMENDACIONES TIENE ESTA PELÍCULA */}
                        {rec.totalRecommendations > 1 && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            📊 {rec.totalRecommendations} recomendaciones
                          </span>
                        )}
                      </div>
                      
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        rec.visualizada 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {rec.visualizada ? '✅ Visualizada' : '⏳ Pendiente'}
                      </span>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                      <button
                        className="text-gray-500 hover:text-blue-600 p-1"
                        onClick={() => handleEdit(rec)}
                        title="Editar recomendación"
                        disabled={updatingItems.has(rec.id)}
                      >
                        <PencilIcon size={20} />
                      </button>
                      
                      <button
                        className="text-gray-500 hover:text-red-600 p-1"
                        onClick={() => handleDelete(rec.id)}
                        title="Eliminar recomendación"
                        disabled={updatingItems.has(rec.id)}
                      >
                        <Trash2Icon size={20} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleToggleViewed(rec.id, rec.visualizada)}
                      disabled={updatingItems.has(rec.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        rec.visualizada 
                          ? 'bg-green-100 text-green-800 hover:bg-orange-100 hover:text-orange-800' 
                          : 'bg-red-100 text-red-800 hover:bg-green-100 hover:text-green-800'
                      } ${updatingItems.has(rec.id) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {updatingItems.has(rec.id) ? '🔄' : rec.visualizada ? '✅ → ⏳' : '⏳ → ✅'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Stats Footer */}
      {topRecommendations.length > 0 && (
        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Estadísticas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-500">
                {topRecommendations.length}
              </div>
              <div className="text-sm text-gray-600">Películas Únicas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">
                {topRecommendations.filter(r => r.visualizada).length}
              </div>
              <div className="text-sm text-gray-600">Visualizadas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-500">
                {topRecommendations.length > 0 
                  ? (topRecommendations.reduce((sum, r) => sum + (r.puntuacionPredicha || 0), 0) / topRecommendations.length).toFixed(1)
                  : '0.0'
                }
              </div>
              <div className="text-sm text-gray-600">Puntuación Promedio</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-500">
                {topRecommendations.reduce((sum, r) => sum + r.totalRecommendations, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Recomendaciones</div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para crear/editar */}
      {showRecommendModal && (
        <RecomendationModal
          setShowRecommendModal={setShowRecommendModal}
          recommendationToEdit={recommendationToEdit}
          onUpdate={handleRecommendationUpdate}
        />
      )}
    </div>
  );
};