// src/data/mockMovies.ts
import type { Movie } from '../types';

export const mockMovies: Movie[] = [
  {
    idMovie: 1,
    title: "Inception",
    genere: "Thriller",
    author: "Christopher Nolan",
    description: "Un ladrón que roba secretos corporativos a través del uso de tecnología de sueños compartidos...",
    image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    idMovie: 2,
    title: "Avatar",
    genere: "Acción",
    author: "James Cameron",
    description: "Historia de una especie humanoide de un planeta similar a Jupiter",
    image: "https://image.tmdb.org/t/p/w500/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg",
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z"
  },
  {
    idMovie: 3,
    title: "Interstellar",
    genere: "Ciencia Ficción",
    author: "Christopher Nolan",
    description: "Un grupo de exploradores hace uso de un agujero de gusano recientemente descubierto...",
    image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z"
  },
  {
    idMovie: 4,
    title: "The Dark Knight",
    genere: "Acción",
    author: "Christopher Nolan",
    description: "Batman se enfrenta al Joker, un criminal psicópata que busca sumir Gotham City en la anarquía...",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z"
  },
  {
    idMovie: 5,
    title: "Pulp Fiction",
    genere: "Crimen",
    author: "Quentin Tarantino",
    description: "Las vidas de dos sicarios, un boxeador, la esposa de un gánster y dos bandidos se entrelazan...",
    image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-19T10:00:00Z"
  }
];