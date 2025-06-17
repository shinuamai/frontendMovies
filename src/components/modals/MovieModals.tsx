import { useState } from "react";

export const MovieModals = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRecommendModal, setShowRecommendModal] = useState(false);

  return (
    <div className="p-6">
      {/* Botones */}
      <div className="flex gap-4 mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowAddModal(true)}
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

      {/* Modal Agregar Película */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 text-black">
            <h2 className="text-xl font-bold mb-4">Agregar Película</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Título</label>
                <input type="text" className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">Director</label>
                <input type="text" className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">Año</label>
                <input type="number" className="w-full border p-2 rounded" />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 rounded"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Recomendar Película */}
      {showRecommendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 text-black">
            <h2 className="text-xl font-bold mb-4">Recomendar Película</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Título</label>
                <input type="text" className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">Razón</label>
                <textarea className="w-full border p-2 rounded"></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 rounded"
                  onClick={() => setShowRecommendModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
