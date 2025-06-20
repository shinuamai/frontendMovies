import { type Dispatch, type SetStateAction, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { recommendationBackendService } from "../../services/recommendationBackendService";
import type { Recommendation } from "../../types";

type RecommendationFormData = {
  peliculaId: number;
  razonRecomendacion: string;
};

export const RecomendationModal = ({
  setShowRecommendModal,
  recommendationToEdit = null,
  onUpdate, 
}: {
  setShowRecommendModal: Dispatch<SetStateAction<boolean>>;
  recommendationToEdit?: Recommendation | null;
  onUpdate?: (updated: Recommendation) => void; 
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<RecommendationFormData>({
    defaultValues: {
      peliculaId: 0,
      razonRecomendacion: "",
    },
  });

  useEffect(() => {
    if (recommendationToEdit) {
      setValue("peliculaId", recommendationToEdit.peliculaId);
      setValue("razonRecomendacion", recommendationToEdit.razonRecomendacion || "");
    }
  }, [recommendationToEdit, setValue]);

  const onSubmit: SubmitHandler<RecommendationFormData> = async (data) => {
    try {
      const payload = {
        usuarioId: 1,
        peliculaId: data.peliculaId,
        razonRecomendacion: data.razonRecomendacion,
        puntuacionPredicha: 5.0,
      };

      if (recommendationToEdit?.id) {
        const updated = await recommendationBackendService.update(recommendationToEdit.id, payload); // ✅ MODIFICADO
        alert("✅ Recomendación actualizada correctamente");
        onUpdate?.(updated); 
      } else {
        const created = await recommendationBackendService.create(payload); 
        alert("✅ Recomendación enviada correctamente");
        onUpdate?.(created); 
      }

      reset();
      setShowRecommendModal(false);
    } catch (error) {
      console.error("❌ Error al enviar recomendación:", error);
      alert("Error al enviar o actualizar la recomendación");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 text-black">
        <h2 className="text-xl font-bold mb-4">
          {recommendationToEdit ? "Editar Recomendación" : "Recomendar Película"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">ID de Película</label>
            <input
              {...register("peliculaId", { required: true, valueAsNumber: true })}
              type="number"
              className="w-full border p-2 rounded"
              placeholder="ID de la película"
              required
              disabled={!!recommendationToEdit} // Desactiva si estamos editando
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Razón</label>
            <textarea
              {...register("razonRecomendacion", { required: true })}
              className="w-full border p-2 rounded"
              placeholder="¿Por qué la recomiendas?"
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 rounded"
              onClick={() => {
                reset();
                setShowRecommendModal(false);
              }}
            >
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              {recommendationToEdit ? "Actualizar" : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


