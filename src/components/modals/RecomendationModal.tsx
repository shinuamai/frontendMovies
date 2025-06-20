import type { Dispatch, SetStateAction } from "react";

export const RecomendationModal = ({
  setShowRecommendModal,
}: {
  setShowRecommendModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
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
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
