import { useParams } from "react-router-dom";
import { useMoviesCrud } from "../hooks/useMoviesCrud";

export const MovieView = () => {
  const { id } = useParams();
  const { movies, loading, error } = useMoviesCrud();
  const movie = movies.find((m) => m.idMovie === Number(id));

  if (loading) return <div className="text-center p-8">Cargando...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!movie)
    return (
      <div className="text-center p-8 text-gray-500">
        Película no encontrada
      </div>
    );

  // Extraer el ID de YouTube si es un link de YouTube
  let youtubeId = "";
  if (
    movie.trailer.includes("youtube.com") ||
    movie.trailer.includes("youtu.be")
  ) {
    const match = movie.trailer.match(/(?:v=|be\/(?!.*v=))([\w-]{11})/);
    youtubeId = match ? match[1] : "";
  }

  // Extraer el contenido multimedia en una variable para evitar ternarios anidados
  let mediaContent = null;
  if (youtubeId) {
    mediaContent = (
      <div className="aspect-video w-full rounded overflow-hidden">
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  } else if (movie.trailer) {
    mediaContent = (
      <video controls className="w-full rounded">
        <source src={movie.trailer} />
        <track kind="captions" srcLang="es" label="Español" />
        Tu navegador no soporta la etiqueta de video.
      </video>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-700">{movie.title}</h1>
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="mb-2 text-gray-700">
        <span className="font-semibold">Director:</span> {movie.author}
      </p>
      <p className="mb-2 text-gray-700">
        <span className="font-semibold">Género:</span> {movie.genere}
      </p>
      <p className="mb-4 text-gray-700">{movie.description}</p>
      {mediaContent}
    </div>
  );
};
