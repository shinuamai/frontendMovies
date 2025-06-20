// src/hooks/useRecommendations.ts (reemplazar todo el contenido)
import { useState, useEffect } from 'react';
import { recommendationBackendService } from '../services/recommendationBackendService';
import type { Recommendation, RecommendationCreateRequest } from '../types';

interface UseRecommendationsReturn {
  recommendations: Recommendation[];
  loading: boolean;
  error: string | null;
  addRecommendation: (rec: RecommendationCreateRequest) => Promise<void>;
  markAsViewed: (id: number) => Promise<void>;
  getRecommendationsByUser: (userId: number) => Promise<Recommendation[]>;
  getUnviewedRecommendations: (userId: number) => Promise<Recommendation[]>;
  deleteRecommendation: (id: number) => Promise<void>;
  refreshRecommendations: () => Promise<void>;
  healthCheck: () => Promise<void>;
}

export const useRecommendations = (): UseRecommendationsReturn => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar recomendaciones del backend real
  const loadRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🚀 Loading recommendations from backend...');
      
      const data = await recommendationBackendService.getAll();
      setRecommendations(data);
      
      console.log('✅ Recommendations loaded successfully:', data.length);
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar las recomendaciones';
      setError(errorMessage);
      console.error('❌ Error loading recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar recomendaciones al montar el componente
  useEffect(() => {
    loadRecommendations();
  }, []);

  // Agregar nueva recomendación
  const addRecommendation = async (recData: RecommendationCreateRequest): Promise<void> => {
    try {
      console.log('🚀 Adding new recommendation:', recData);
      const newRecommendation = await recommendationBackendService.create(recData);
      setRecommendations(prev => [...prev, newRecommendation]);
      setError(null);
      console.log('✅ Recommendation added successfully');
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear recomendación';
      setError(errorMessage);
      console.error('❌ Error adding recommendation:', err);
      throw err;
    }
  };

  // Marcar como visualizada
  const markAsViewed = async (id: number): Promise<void> => {
    try {
      console.log(`🚀 Marking recommendation ${id} as viewed...`);
      const updatedRecommendation = await recommendationBackendService.markAsViewed(id);
      
      setRecommendations(prev =>
        prev.map(rec =>
          rec.id === id ? updatedRecommendation : rec
        )
      );
      setError(null);
      console.log('✅ Recommendation marked as viewed successfully');
    } catch (err: any) {
      const errorMessage = err.message || 'Error al marcar como visualizada';
      setError(errorMessage);
      console.error('❌ Error marking as viewed:', err);
      throw err;
    }
  };

  // Obtener recomendaciones por usuario
  const getRecommendationsByUser = async (userId: number): Promise<Recommendation[]> => {
    try {
      console.log(`🚀 Getting recommendations for user ${userId}...`);
      const userRecommendations = await recommendationBackendService.getByUser(userId);
      console.log('✅ User recommendations retrieved:', userRecommendations.length);
      return userRecommendations;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener recomendaciones del usuario';
      setError(errorMessage);
      console.error('❌ Error getting user recommendations:', err);
      throw err;
    }
  };

  // Obtener recomendaciones no visualizadas
  const getUnviewedRecommendations = async (userId: number): Promise<Recommendation[]> => {
    try {
      console.log(`🚀 Getting unviewed recommendations for user ${userId}...`);
      const unviewedRecommendations = await recommendationBackendService.getUnviewed(userId);
      console.log('✅ Unviewed recommendations retrieved:', unviewedRecommendations.length);
      return unviewedRecommendations;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener recomendaciones no visualizadas';
      setError(errorMessage);
      console.error('❌ Error getting unviewed recommendations:', err);
      throw err;
    }
  };

  // Eliminar recomendación
  const deleteRecommendation = async (id: number): Promise<void> => {
    try {
      console.log(`🚀 Deleting recommendation ${id}...`);
      await recommendationBackendService.delete(id);
      setRecommendations(prev => prev.filter(rec => rec.id !== id));
      setError(null);
      console.log('✅ Recommendation deleted successfully');
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar recomendación';
      setError(errorMessage);
      console.error('❌ Error deleting recommendation:', err);
      throw err;
    }
  };

  // Refrescar recomendaciones
  const refreshRecommendations = async (): Promise<void> => {
    await loadRecommendations();
  };

  // Health check
  const healthCheck = async (): Promise<void> => {
    try {
      console.log('🚀 Performing health check...');
      const healthStatus = await recommendationBackendService.healthCheck();
      console.log('✅ Health check successful:', healthStatus);
      setError(null);
    } catch (err: any) {
      const errorMessage = err.message || 'Error en health check';
      setError(errorMessage);
      console.error('❌ Health check failed:', err);
      throw err;
    }
  };

  return {
    recommendations,
    loading,
    error,
    addRecommendation,
    markAsViewed,
    getRecommendationsByUser,
    getUnviewedRecommendations,
    deleteRecommendation,
    refreshRecommendations,
    healthCheck
  };
};