import { recommendationGatewayClient, recommendationDirectClient } from './recommendationApiClient';
import type { Recommendation, RecommendationCreateRequest } from '../types';

export const recommendationBackendService = {
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


  getAll: async (): Promise<Recommendation[]> => {
    try {
      console.log('🔄 Fetching all recommendations via Gateway...');
      const response = await recommendationGatewayClient.get('/api/recommendation');
      console.log('✅ All recommendations count (gateway):', response.data?.length ?? 0);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...', error);
      const response = await recommendationDirectClient.get('/');
      console.log('✅ All recommendations count (direct):', response.data?.length ?? 0);
      return response.data;
    }
  },


  create: async (recommendation: RecommendationCreateRequest): Promise<Recommendation> => {
    try {
      console.log('🔄 Creating recommendation via Gateway...', recommendation);
      const response = await recommendationGatewayClient.post('/api/recommendation', recommendation);
      console.log('✅ Recommendation created:', response.data);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...', error);
      const response = await recommendationDirectClient.post('/', recommendation);
      console.log('✅ Recommendation created (direct):', response.data);
      return response.data;
    }
  },


  update: async (id: number, recommendation: Partial<Recommendation>): Promise<Recommendation> => {
    try {
      console.log(`🔄 Updating recommendation ${id} via Gateway...`);
      const response = await recommendationGatewayClient.put(`/api/recommendation/${id}`, recommendation);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...', error);
      const response = await recommendationDirectClient.put(`/${id}`, recommendation);
      return response.data;
    }
  },


  markAsViewed: async (id: number): Promise<Recommendation> => {
    try {
      console.log(`🔄 Marking recommendation ${id} as viewed via Gateway...`);
      const response = await recommendationGatewayClient.put(`/api/recommendation/${id}/marcar-visualizada`);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, using update method...', error);
      // Fallback: usar el método update normal
      return await recommendationBackendService.update(id, { visualizada: true });
    }
  },


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


  getUnviewed: async (userId: number): Promise<Recommendation[]> => {
    try {
      console.log(`🔄 Fetching unviewed recommendations for user ${userId} via Gateway...`);
      const response = await recommendationGatewayClient.get(`/api/recommendation/usuario/${userId}/no-visualizadas`);
      console.log('✅ Unviewed recommendations count:', response.data?.length ?? 0);
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...', error);
      const response = await recommendationDirectClient.get(`/usuario/${userId}/no-visualizadas`);
      console.log('✅ Unviewed recommendations count (direct):', response.data?.length ?? 0);
      return response.data;
    }
  },

  
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


  healthCheck: async (): Promise<string> => {
    try {
      console.log('🔄 Performing health check via Gateway...');
      const response = await recommendationGatewayClient.get('/api/recommendation/health');
      return response.data;
    } catch (error) {
      console.warn('⚠️ Gateway failed, trying direct connection...', error);
      const response = await recommendationDirectClient.get('/health');
      return response.data;
    }
  }
};