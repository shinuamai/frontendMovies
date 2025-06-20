// src/pages/Movies.tsx
import { useState, useEffect } from 'react';
import { useMoviesCrud } from '../hooks/useMoviesCrud';
import { mockMovies } from '../data';
import type { Movie } from '../types';
import { MovieCard } from '../components/MovieCard';


export const Movies = () => {
  const { movies, loading, error, createMovie, updateMovie, deleteMovie } = useMoviesCrud();

  // Estado para el formulario
  const [form, setForm] = useState<Omit<Movie, 'idMovie'>>({
    title: '',
    author: '',
    genere: '',
    description: '',
    image: '',
  });
  const [editId, setEditId] = useState<number | null>(null);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejar submit para agregar o actualizar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await updateMovie(editId, form);
      setEditId(null);
    } else {
      await createMovie(form);
    }
    setForm({ title: '', author: '', genere: '', description: '', image: '' });
  };

  // Manejar editar
  const handleEdit = (movie: Movie) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setEditId(movie.idMovie);
    setForm({
      title: movie.title,
      author: movie.author,
      genere: movie.genere,
      description: movie.description,
      image: movie.image,
    });
  };
  
  // const [movies, setMovies] = useState<Movie[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simular carga de datos
  //   setTimeout(() => {
  //     setMovies(mockMovies);
  //     setLoading(false);
  //   }, 1000);
  // }, []);
  

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
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Catálogo de Películas</h1>
      
      {/* Formulario para agregar/editar */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 rounded shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Título"
            className="border p-2 rounded text-gray-800"
            required
          />
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Director"
            className="border p-2 rounded text-gray-800"
            required
          />
          <input
            name="genere"
            value={form.genere}
            onChange={handleChange}
            placeholder="Género"
            className="border p-2 rounded text-gray-800"
            required
          />
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="URL de la imagen"
            className="border p-2 rounded text-gray-800"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción"
            className="border p-2 rounded col-span-1 md:col-span-2 text-gray-800"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          {editId ? 'Actualizar' : 'Agregar'}
        </button>
        {editId && (
          <button
            type="button"
            className="mt-4 ml-2 px-4 py-2 bg-gray-400 text-white rounded"
            onClick={() => {
              setEditId(null);
              setForm({ title: '', author: '', genere: '', description: '', image: '' });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.idMovie}
            movie={movie}
            onEdit={handleEdit}
            onDelete={deleteMovie}
          />
        ))}
      </div>
    </div>
  );
};
