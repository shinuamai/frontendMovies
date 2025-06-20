import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
}

export const MovieCard = ({ movie, onEdit, onDelete }: MovieCardProps) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <img 
      src={movie.image} 
      alt={movie.title}
      className="w-full h-64 object-cover"
    />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{movie.title}</h3>
      <p className="text-gray-600 mb-2">Director: {movie.author}</p>
      <p className="text-sm text-gray-500 mb-2">Género: {movie.genere}</p>
      <p className="text-gray-700 text-sm">{movie.description}</p>
      <button
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded mr-2"
        onClick={() => onDelete(movie.idMovie)}
      >
        Eliminar
      </button>
      <button
        className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded"
        onClick={() => onEdit(movie)}
      >
        Editar
      </button>
    </div>
  </div>
);