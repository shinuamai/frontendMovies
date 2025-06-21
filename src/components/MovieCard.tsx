import { Link } from "react-router-dom";
import type { Movie } from "../types";
import { PencilIcon, Play, Trash2Icon } from "lucide-react";

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
      <h3 className="text-xl font-semibold mb-2 text-gray-800">
        {movie.title}
      </h3>
      <p className="text-gray-600 mb-2">Director: {movie.author}</p>
      <p className="text-sm text-gray-500 mb-2">Género: {movie.genere}</p>
      <p className="text-gray-700 text-sm">{movie.description}</p>
      <div className="flex items-center justify-between mt-4">
        <Link
          to={`/movie/trailer/${movie.idMovie}`}
          className="flex items-center w-12 h-12 rounded-full group transition-all duration-300 hover:bg-gray-200"
        >
          <div className="text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center p-2">
            <Play size={30} />
          </div>
          <span className="ml-2 font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-hover:text-black transition-opacity duration-300">
            Ver Película
          </span>
        </Link>

        <div className="flex gap-2">
          <button
            className="text-gray-500 hover:text-blue-600 p-1"
            onClick={() => onEdit(movie)}
          >
            <PencilIcon size={20} />
          </button>
          <button
            className="text-gray-500 hover:text-red-600 p-1"
            onClick={() => onDelete(movie.idMovie)}
          >
            <Trash2Icon size={20} />
          </button>
        </div>
      </div>
    </div>
  </div>
);
