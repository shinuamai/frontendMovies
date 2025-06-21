import { type Dispatch, type SetStateAction } from "react";
import type { Movie } from "../../types";
import { useMoviesCrud } from "../../hooks/useMoviesCrud";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";

export const MovieModals = ({
  setShowMovieModal,
  editMovie,
  setEditMovie,
  refetchMovies,
}: {
  editMovie: Movie | null;
  setShowMovieModal: Dispatch<SetStateAction<boolean>>;
  setEditMovie: Dispatch<SetStateAction<Movie | null>>;
  refetchMovies: () => void;
}) => {
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: editMovie?.title ?? "",
      author: editMovie?.author ?? "",
      genere: editMovie?.genere ?? "",
      image: editMovie?.image ?? "",
      description: editMovie?.description ?? "",
      trailer: editMovie?.trailer ?? "",
    },
  });
  const { createMovie, updateMovie } = useMoviesCrud();

  // Manejar submit para agregar o actualizar
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (editMovie) {
      await updateMovie(editMovie.idMovie, data);
      refetchMovies();
      setShowMovieModal(false);
      setEditMovie(null);
      reset();
    } else {
      await createMovie({
        title: data.title,
        author: data.author,
        genere: data.genere,
        image: data.image,
        description: data.description,
        trailer: data.trailer,
      });
      refetchMovies();
      setShowMovieModal(false);
      setEditMovie(null);
      reset();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 text-black">
        <h2 className="text-xl font-bold mb-4">{editMovie ? "Actualizar" : "Agregar"} Película</h2>
        {/* Formulario para agregar/editar */}
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("title", { required: true })}
              placeholder="Título"
              className="border p-2 rounded text-gray-800"
              required
            />
            <input
              {...register("author", { required: true })}
              placeholder="Director"
              className="border p-2 rounded text-gray-800"
              required
            />
            <input
              {...register("genere", { required: true })}
              placeholder="Género"
              className="border p-2 rounded text-gray-800"
              required
            />
            <input
              {...register("image", { required: true })}
              placeholder="URL de la imagen"
              className="border p-2 rounded text-gray-800"
              required
            />
            <textarea
              {...register("description", { required: true })}
              placeholder="Descripción"
              className="border p-2 rounded col-span-1 md:col-span-2 text-gray-800"
              required
            />
            <input
              {...register("trailer", { required: true })}
              placeholder="URL del trailer"
              className="border p-2 rounded text-gray-800"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
          <button
            type="button"
            className="mt-4 ml-2 px-4 py-2 bg-gray-400 text-white rounded"
            onClick={() => {
              setShowMovieModal(false);
              setEditMovie(null);
              reset();
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            {editMovie ? "Actualizar" : "Agregar"}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};
