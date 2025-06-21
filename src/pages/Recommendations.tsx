import { useState, useEffect } from 'react';
import { mockRecommendations, mockMovies } from '../data';
import type { Recommendation } from '../types';
import { PencilIcon, Trash2Icon } from 'lucide-react'; 
import { RecomendationModal } from '../components/modals/RecomendationModal';
import { recommendationBackendService } from '../services/recommendationBackendService'; 

export const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const [recommendationToEdit, setRecommendationToEdit] = useState<Recommendation | null>(null);
  const [error, setError] = useState<string | null>(null); 
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set()); 


  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        
        const userRecommendations = await recommendationBackendService.getByUser(1);
        setRecommendations(userRecommendations);
        console.log(`✅ Loaded ${userRecommendations.length} recommendations`);
        
      } catch (err: any) {
        console.error('❌ Error loading recommendations:', err);
        setError('Error al cargar recomendaciones. Usando datos de prueba.');
        
        
        setRecommendations(mockRecommendations);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, []);

  const getMovieTitle = (peliculaId: number) => {
    const movie = mockMovies.find(m => m.idMovie === peliculaId);
    return movie?.title || `Película ID: ${peliculaId}`;
  };

  
  const handleEdit = (rec: Recommendation) => {
    setRecommendationToEdit(rec);
    setShowRecommendModal(true);
  };

  
  const handleToggleViewed = async (id: number, currentStatus: boolean) => {
    setUpdatingItems(prev => new Set(prev).add(id));
    try {
      const newStatus = !currentStatus;
      
      const currentRec = recommendations.find(r => r.id === id);
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

      console.log('🔄 Updating recommendation with payload:', updatePayload);
      
      const updatedRec = await recommendationBackendService.update(id, updatePayload);
      
      setRecommendations(prev => 
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
      setRecommendations(prev => prev.filter(rec => rec.id !== id));
      console.log(`✅ Recommendation ${id} deleted successfully`);
    } catch (err) {
      console.error('❌ Error deleting recommendation:', err);
      setError('Error al eliminar recomendación');
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };


  const handleRecommendationUpdate = (updated: Recommendation) => {
    if (recommendationToEdit) {
      
      setRecommendations(prev => 
        prev.map(rec => rec.id === updated.id ? updated : rec)
      );
    } else {
    
      setRecommendations(prev => [updated, ...prev]);
    }
    setRecommendationToEdit(null);
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mis Recomendaciones</h1>
        
        {/* ✅ AGREGAR: Estadísticas básicas */}
        <div className="text-sm text-gray-500">
          <div>Total: {recommendations.length}</div>
          <div>Vistas: {recommendations.filter(r => r.visualizada).length}</div>
          <div>Pendientes: {recommendations.filter(r => !r.visualizada).length}</div>
        </div>
      </div>

      {/* ✅ AGREGAR: Mostrar errores */}
      {error && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          ⚠️ {error}
        </div>
      )}

      {recommendations.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            No hay recomendaciones disponibles
          </div>
          <div className="text-sm text-gray-400">
            Crea algunas recomendaciones desde la página de películas
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div 
              key={rec.id} 
              className={`bg-white rounded-lg shadow-md p-6 border-l-4 transition-opacity ${
                rec.visualizada ? 'border-green-500' : 'border-red-500'
              } ${updatingItems.has(rec.id) ? 'opacity-50' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {getMovieTitle(rec.peliculaId)}
                  </h3>
                  <p className="text-gray-700 mb-2">{rec.razonRecomendacion}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>⭐ {rec.puntuacionPredicha}/5</span>
                    <span>👤 Usuario: {rec.usuarioId}</span>
                    <span>📅 {new Date(rec.fechaRecomendacion).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {/* Panel de acciones más completo */}
                <div className="flex flex-col items-end gap-2">
                  {/* Botones de acción */}
                  <div className="flex gap-2">
                    <button
                      className="text-gray-500 hover:text-blue-600 p-1"
                      onClick={() => handleEdit(rec)}
                      title="Editar recomendación"
                      disabled={updatingItems.has(rec.id)}
                    >
                      <PencilIcon size={20} />
                    </button>
                    
                    {/* Botón eliminar */}
                    <button
                      className="text-gray-500 hover:text-red-600 p-1"
                      onClick={() => handleDelete(rec.id)}
                      title="Eliminar recomendación"
                      disabled={updatingItems.has(rec.id)}
                    >
                      <Trash2Icon size={20} />
                    </button>
                  </div>

                  {/* Botón toggle estado */}
                  <button
                    onClick={() => handleToggleViewed(rec.id, rec.visualizada)}
                    disabled={updatingItems.has(rec.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      rec.visualizada 
                        ? 'bg-green-100 text-green-800 hover:bg-orange-100 hover:text-orange-800' 
                        : 'bg-red-100 text-red-800 hover:bg-green-100 hover:text-green-800'
                    } ${updatingItems.has(rec.id) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {updatingItems.has(rec.id) ? '🔄' : rec.visualizada ? '✅ Vista → ⏳ Pendiente' : '⏳ Pendiente → ✅ Vista'}
                  </button>

                  {/* Indicador de estado */}
                  <span className="text-xs text-gray-400">
                    {rec.visualizada ? 'Visualizada' : 'Pendiente'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal con callback */}
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