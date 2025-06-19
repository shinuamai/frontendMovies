import { recommendationGatewayClient, recommendationDirectClient } from './recommendationApiClient';
import type { Recommendation, RecommendationCreateRequest } from '../types';

export const recommendationBackendService = {
  // Obtener todas las recomendaciones
  getAll: async (): Promise<Recommendation[]> => {
    try {
      console.log('🔄 Fetching all recommendations via Gateway...');
      const response = await recommendationGatewayClient.get('/api/recommendation');
      console.log('✅ Gateway success - recommendations count:', response.data?.length || 0);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...');
      try {
        const response = await recommendationDirectClient.get('/');
        console.log('✅ Direct success - recommendations count:', response.data?.length || 0);
        return response.data;
      } catch (directError) {
        console.error('❌ Both Gateway and Direct failed');
        throw new Error('No se pudo conectar con el servicio de recomendaciones');
      }
    }
  },

  // Obtener por ID
  getById: async (id: number): Promise<Recommendation> => {
    try {
      console.log(`🔄 Fetching recommendation ${id} via Gateway...`);
      const response = await recommendationGatewayClient.get(`/api/recommendation/${id}`);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...');
      const response = await recommendationDirectClient.get(`/${id}`);
      return response.data;
    }
  },

  // Crear recomendación
  create: async (recommendation: RecommendationCreateRequest): Promise<Recommendation> => {
    try {
      console.log('🔄 Creating recommendation via Gateway...', recommendation);
      const response = await recommendationGatewayClient.post('/api/recommendation', recommendation);
      console.log('✅ Recommendation created:', response.data);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...');
      const response = await recommendationDirectClient.post('/', recommendation);
      console.log('✅ Recommendation created (direct):', response.data);
      return response.data;
    }
  },

  // Actualizar recomendación
  update: async (id: number, recommendation: Partial<Recommendation>): Promise<Recommendation> => {
    try {
      console.log(`🔄 Updating recommendation ${id} via Gateway...`);
      const response = await recommendationGatewayClient.put(`/api/recommendation/${id}`, recommendation);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...');
      const response = await recommendationDirectClient.put(`/${id}`, recommendation);
      return response.data;
    }
  },

  // Eliminar recomendación
  delete: async (id: number): Promise<void> => {
    try {
      console.log(`🔄 Deleting recommendation ${id} via Gateway...`);
      await recommendationGatewayClient.delete(`/api/recommendation/${id}`);
      console.log('✅ Recommendation deleted');
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...');
      await recommendationDirectClient.delete(`/${id}`);
      console.log('✅ Recommendation deleted (direct)');
    }
  },

  // Obtener por usuario
  getByUser: async (userId: number): Promise<Recommendation[]> => {
    try {
      console.log(`🔄 Fetching recommendations for user ${userId} via Gateway...`);
      const response = await recommendationGatewayClient.get(`/api/recommendation/usuario/${userId}`);
      console.log('✅ User recommendations count:', response.data?.length || 0);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...');
      const response = await recommendationDirectClient.get(`/usuario/${userId}`);
      console.log('✅ User recommendations count (direct):', response.data?.length || 0);
      return response.data;
    }
  },

  // Obtener por película
  getByMovie: async (movieId: number): Promise<Recommendation[]> => {
    try {
      console.log(`🔄 Fetching recommendations for movie ${movieId} via Gateway...`);
      const response = await recommendationGatewayClient.get(`/api/recommendation/pelicula/${movieId}`);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...');
      const response = await recommendationDirectClient.get(`/pelicula/${movieId}`);
      return response.data;
    }
  },

  // Marcar como visualizada
  markAsViewed: async (id: number): Promise<Recommendation> => {
    try {
      console.log(`🔄 Marking recommendation ${id} as viewed via Gateway...`);
      const response = await recommendationGatewayClient.put(`/api/recommendation/${id}/marcar-visualizada`);
      console.log('✅ Recommendation marked as viewed');
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...');
      const response = await recommendationDirectClient.put(`/${id}/marcar-visualizada`);
      console.log('✅ Recommendation marked as viewed (direct)');
      return response.data;
    }
  },

  // Obtener no visualizadas
  getUnviewed: async (userId: number): Promise<Recommendation[]> => {
    try {
      console.log(`🔄 Fetching unviewed recommendations for user ${userId} via Gateway...`);
      const response = await recommendationGatewayClient.get(`/api/recommendation/usuario/${userId}/no-visualizadas`);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...');
      const response = await recommendationDirectClient.get(`/usuario/${userId}/no-visualizadas`);
      return response.data;
    }
  },

  // Obtener top recomendaciones
  getTopRecommendations: async (userId: number, minScore: number = 4.0): Promise<Recommendation[]> => {
    try {
      console.log(`🔄 Fetching top recommendations for user ${userId} (min score: ${minScore}) via Gateway...`);
      const response = await recommendationGatewayClient.get(`/api/recommendation/usuario/${userId}/top?puntuacionMinima=${minScore}`);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...');
      const response = await recommendationDirectClient.get(`/usuario/${userId}/top?puntuacionMinima=${minScore}`);
      return response.data;
    }
  },

  // Obtener película desde catálogo (comunicación entre microservicios)
  getMovieFromCatalog: async (movieId: number) => {
    try {
      console.log(`🔄 Fetching movie ${movieId} from catalog via Gateway...`);
      const response = await recommendationGatewayClient.get(`/api/recommendation/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...');
      const response = await recommendationDirectClient.get(`/movie/${movieId}`);
      return response.data;
    }
  },

  // Health check
  healthCheck: async (): Promise<string> => {
    try {
      console.log('🔄 Health check via Gateway...');
      const response = await recommendationGatewayClient.get('/api/recommendation/health');
      console.log('✅ Health check successful:', response.data);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...');
      const response = await recommendationDirectClient.get('/health');
      console.log('✅ Health check successful (direct):', response.data);
      return response.data;
    }
  }
};