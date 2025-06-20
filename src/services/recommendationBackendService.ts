import { recommendationGatewayClient, recommendationDirectClient } from './recommendationApiClient';
import type { Recommendation, RecommendationCreateRequest } from '../types';

export const recommendationBackendService = {
  // Obtener por ID
  getById: async (id: number): Promise<Recommendation> => {
    try {
      console.log(`🔄 Fetching recommendation ${id} via Gateway...`);
      const response = await recommendationGatewayClient.get(`/api/recommendation/${id}`);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...', error);
      const response = await recommendationDirectClient.get(`/${id}`);
      return response.data;
    }
  },

  // Crear recomendación
create: async (recommendation: RecommendationCreateRequest): Promise<Recommendation> => {
  try {
    console.log('🔄 Creating recommendation via Gateway...', recommendation);
    const response = await recommendationGatewayClient.post('', recommendation);
    console.log('✅ Recommendation created:', response.data);
    return response.data;
  } catch (error) {
    console.warn('⚠️ Gateway failed, trying direct connection...', error);
    const response = await recommendationDirectClient.post('', recommendation);
    console.log('✅ Recommendation created (direct):', response.data);
    return response.data;
  }
},


  // Actualizar recomendación
  update: async (id: number, recommendation: Partial<Recommendation>): Promise<Recommendation> => {
    try {
      console.log(`🔄 Updating recommendation ${id} via Gateway...`);
      const response = await recommendationGatewayClient.put(`${id}`, recommendation);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...', error);
      const response = await recommendationDirectClient.put(`${id}`, recommendation);
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
      console.warn('⚠️ Gateway failed, trying direct connection...', error);
      await recommendationDirectClient.delete(`/${id}`);
      console.log('✅ Recommendation deleted (direct)');
    }
  },

  // Obtener por usuario
  getByUser: async (userId: number): Promise<Recommendation[]> => {
    try {
      console.log(`🔄 Fetching recommendations for user ${userId} via Gateway...`);
      const response = await recommendationGatewayClient.get(`/api/recommendation/usuario/${userId}`);
      console.log('✅ User recommendations count:', response.data?.length ?? 0);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...', error);
      const response = await recommendationDirectClient.get(`/usuario/${userId}`);
      console.log('✅ User recommendations count (direct):', response.data?.length ?? 0);
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
      console.warn('⚠️ Gateway failed, trying direct connection...', error);
      const response = await recommendationDirectClient.get(`/usuario/${userId}/top?puntuacionMinima=${minScore}`);
      return response.data;
    }
  },

};