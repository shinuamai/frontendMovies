// src/data/mockRecommendations.ts
import type { Recommendation } from '../types';

export const mockRecommendations: Recommendation[] = [
  {
    id: 1,
    usuarioId: 1,
    peliculaId: 1,
    razonRecomendacion: "Basado en tu gusto por thrillers psicológicos",
    puntuacionPredicha: 4.8,
    fechaRecomendacion: "2024-01-15T10:00:00Z",
    visualizada: false
  },
  {
    id: 2,
    usuarioId: 1,
    peliculaId: 3,
    razonRecomendacion: "Te encanta la ciencia ficción compleja",
    puntuacionPredicha: 4.7,
    fechaRecomendacion: "2024-01-16T10:00:00Z",
    visualizada: true
  },
  {
    id: 3,
    usuarioId: 2,
    peliculaId: 2,
    razonRecomendacion: "Películas de acción épicas",
    puntuacionPredicha: 4.5,
    fechaRecomendacion: "2024-01-17T10:00:00Z",
    visualizada: false
  },
  {
    id: 4,
    usuarioId: 1,
    peliculaId: 4,
    razonRecomendacion: "Continuando con películas de Christopher Nolan",
    puntuacionPredicha: 4.9,
    fechaRecomendacion: "2024-01-18T10:00:00Z",
    visualizada: false
  },
  {
    id: 5,
    usuarioId: 3,
    peliculaId: 5,
    razonRecomendacion: "Clásicos del cine moderno",
    puntuacionPredicha: 4.6,
    fechaRecomendacion: "2024-01-19T10:00:00Z",
    visualizada: true
  }
];