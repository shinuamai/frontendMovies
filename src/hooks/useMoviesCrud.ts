import { useState, useEffect, useCallback } from "react";
import type { Movie } from "../types";

const API_URL = "http://localhost:9090/api/catalog";

export function useMoviesCrud() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener películas (refetch)
  const fetchMovies = useCallback(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error al cargar películas");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Crear película
  const createMovie = async (movie: Omit<Movie, "idMovie">) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      });
      const { data } = await res.json();
      setMovies((prev) => [...prev, data]);
    } catch {
      setError("Error al crear película");
    }
  };

  // Actualizar película
  const updateMovie = async (id: number, updated: Partial<Movie>) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const { data } = await res.json();
      setMovies((prev) => prev.map((m) => (m.idMovie === id ? data : m)));
    } catch {
      setError("Error al actualizar película");
    }
  };

  // Eliminar película
  const deleteMovie = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setMovies((prev) => prev.filter((m) => m.idMovie !== id));
    } catch {
      setError("Error al eliminar película");
    }
  };

  return {
    movies,
    loading,
    error,
    createMovie,
    updateMovie,
    deleteMovie,
    refetchMovies: fetchMovies,
  };
}
