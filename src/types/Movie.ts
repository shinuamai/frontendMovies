// src/types/Movie.ts
export interface Movie {
  idMovie: number;
  title: string;
  genere: string;
  author: string;
  description: string;
  image: string;
  trailer: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MovieCreateRequest {
  title: string;
  genere: string;
  author: string;
  description: string;
  image: string;
  trailer: string;
}

export interface MovieUpdateRequest {
  title?: string;
  genere?: string;
  author?: string;
  description?: string;
  image?: string;
  trailer?: string;
}