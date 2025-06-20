const RECOMMENDATIONS_API_CONFIG = {
  
  GATEWAY_URL: 'http://localhost:9090',
  GATEWAY_ROUTE: '/api/recommendation',
  
  DIRECT_URL: 'http://localhost:8081/api/recommendation',
  
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export default RECOMMENDATIONS_API_CONFIG;