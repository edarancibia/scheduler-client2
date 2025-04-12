import React from "react";

interface EventDetailModalProps {
  event: any;
  onClose: () => void;
  onConfirm: () => void;
  onCancelEvent: () => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onConfirm,
  onCancelEvent,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <div className="mb-4">
          <input
            type="hidden"
            value={event.id}
            readOnly
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Detalle
          </label>
          <span className="block mt-1 text-gray-800">{event.service}</span>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Fecha de Inicio
          </label>
          <span className="block mt-1 text-gray-800">
            {new Date(event.date).toLocaleString()}
          </span>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Fecha de Fin
          </label>
          <span className="block mt-1 text-gray-800">
            {new Date(event.dateEnd).toLocaleString()}
          </span>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Cliente
          </label>
          <span className="block mt-1 text-gray-800">
            {`${event.customer?.name || ""} ${event.customer?.lastname || ""}`}
          </span>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Email del Cliente
          </label>
          <span className="block mt-1 text-gray-800">
            {event.customer?.email || ""}
          </span>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Teléfono del Cliente
          </label>
          <span className="block mt-1 text-gray-800">
            {event.customer?.phone || ""}
          </span>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={onConfirm}
          >
            Confirmar
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={onCancelEvent}
          >
            Cancelar
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;
