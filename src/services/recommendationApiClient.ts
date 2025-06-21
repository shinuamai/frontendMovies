import axios from 'axios';
import type { AxiosInstance } from 'axios';  
import RECOMMENDATIONS_API_CONFIG from '../config/recommendationsApi';

// Cliente para el Gateway
export const recommendationGatewayClient: AxiosInstance = axios.create({
  baseURL: RECOMMENDATIONS_API_CONFIG.GATEWAY_URL,
  timeout: RECOMMENDATIONS_API_CONFIG.TIMEOUT,
  headers: RECOMMENDATIONS_API_CONFIG.HEADERS
});

// Cliente directo como fallback
export const recommendationDirectClient: AxiosInstance = axios.create({
  baseURL: RECOMMENDATIONS_API_CONFIG.DIRECT_URL,
  timeout: RECOMMENDATIONS_API_CONFIG.TIMEOUT,
  headers: RECOMMENDATIONS_API_CONFIG.HEADERS
});

// Interceptores para logging de solicitudes y respuestas
recommendationGatewayClient.interceptors.response.use(
  (response) => {
    console.log('✅ Gateway Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Gateway Error:', error.response?.status, error.config?.url, error.response?.data);
    return Promise.reject(error);
  }
);

recommendationDirectClient.interceptors.response.use(
  (response) => {
    console.log('✅ Direct Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Direct Error:', error.response?.status, error.config?.url, error.response?.data);
    return Promise.reject(error);
  }
);