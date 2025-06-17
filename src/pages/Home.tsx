import React from "react";
import { MovieModals } from "../components/modals/MovieModals";

export const Home: React.FC = () => {
  const username = "Usuario";


  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-6">
        Bienvenido, <span className="text-red-400">{username}</span>
      </h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-lg">
          Esta es tu plataforma para explorar, recomendar y agregar peliculas.
        </p>
      </div>
      <MovieModals />
    </div>
    
  );
};


