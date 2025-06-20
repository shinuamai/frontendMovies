import React from "react";
import { FuturisticParticles } from "../components/FuturisticParticles";
import { useNavigate } from "react-router-dom";
import "../App.css";

export const Home: React.FC = () => {
  const username = "Usuario";
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col justify-center items-center overflow-hidden relative">
      <div className="absolute inset-0 -z-10">
        <FuturisticParticles />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto p-8 gap-12 animate-fade-in-up">
        <div className="flex-1 flex justify-center items-center">
          <img
            src="/banner.jpg"
            alt="Banner"
            className="rounded-3xl shadow-2xl w-[320px] md:w-[420px] object-cover float-water"
          />
        </div>
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg text-white float-text">
            Bienvenido,{" "}
            <span className="text-red-400 animate-pulse">{username}</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium drop-shadow text-white mb-6 float-text">
            Tu plataforma para explorar, recomendar y agregar películas, <span className="text-red-400">DALE CLICK EN LA CÁMARA</span>
          </p>
          <div className="relative w-[220px] md:w-[320px] mt-4 cursor-pointer group">
            <button
              onClick={() => navigate("/movies")}
              className="w-full h-full rounded-2xl shadow-xl overflow-hidden p-0 border-0 bg-transparent group float-water group-hover:float-water-paused transition-transform duration-500"
              style={{ aspectRatio: '16/9', minHeight: '0' }}
            >
              <img
                src="/imagen2.png"
                alt="Banner2"
                className="w-full h-full object-cover rounded-2xl pointer-events-none select-none bg-[#b8a7a0]"
                draggable="false"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold opacity-0 group-hover:opacity-90 bg-black bg-opacity-40 rounded-2xl transition-opacity duration-300">
                Películas
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
