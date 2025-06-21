// src/pages/Movies.tsx
import { useState } from "react";
import { useMoviesCrud } from "../hooks/useMoviesCrud";
import { MovieCard } from "../components/MovieCard";
import { MovieModals } from "../components/modals/MovieModals";
import { RecomendationModal } from "../components/modals/RecomendationModal";
import type { Movie } from "../types";

export const Movies = () => {
  const { movies, loading, error, deleteMovie, refetchMovies } =
    useMoviesCrud();

  // Estado para el formulario

  const [editMovie, setEditMovie] = useState<Movie | null>(null);

  const [showMovieModal, setShowMovieModal] = useState(false);
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const handlerEditMovie = (movie: Movie) => {
    setEditMovie(movie);
    setShowMovieModal(true);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl">Cargando películas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Catálogo de Películas
      </h1>
      <div className="flex gap-4 mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowMovieModal(true)}
        >
          Agregar Película
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setShowRecommendModal(true)}
        >
          Recomendar Película
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.idMovie}
            movie={movie}
            onEdit={() => handlerEditMovie(movie)}
            onDelete={deleteMovie}
          />
        ))}
      </div>
      {/* Modal Agregar Película */}
      {showMovieModal && (
        <MovieModals
          setShowMovieModal={setShowMovieModal}
          editMovie={editMovie}
          setEditMovie={setEditMovie}
          refetchMovies={refetchMovies}
        />
      )}
      {/* Modal Recomendar Película */}
      {showRecommendModal && (
        <RecomendationModal setShowRecommendModal={setShowRecommendModal} />
      )}
    </div>
  );
};
