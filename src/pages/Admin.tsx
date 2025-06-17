// src/pages/Admin.tsx
export const Admin = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Gestión de Películas</h3>
          <p className="text-gray-600 mb-4">Añadir, editar y eliminar películas del catálogo</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Gestionar Películas
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Recomendaciones</h3>
          <p className="text-gray-600 mb-4">Ver y gestionar las recomendaciones del sistema</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
            Ver Recomendaciones
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Estadísticas</h3>
          <p className="text-gray-600 mb-4">Análisis y métricas del sistema</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
            Ver Estadísticas
          </button>
        </div>
      </div>
    </div>
  );
};