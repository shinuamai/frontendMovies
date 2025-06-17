// src/types/Recommendation.ts
import type { Movie } from './Movie';

export interface Recommendation {
  id: number;
  usuarioId: number;
  peliculaId: number;
  razonRecomendacion?: string;
  puntuacionPredicha?: number;
  fechaRecomendacion: string;
  visualizada: boolean;
  movie?: Movie; 
}

export interface RecommendationCreateRequest {
  usuarioId: number;
  peliculaId: number;
  razonRecomendacion?: string;
  puntuacionPredicha?: number;
}

export interface RecommendationUpdateRequest {
  razonRecomendacion?: string;
  puntuacionPredicha?: number;
  visualizada?: boolean;
}