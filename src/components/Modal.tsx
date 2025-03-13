import { useEffect, useState } from "react";
import { ModalProps } from "./interfaces/ModalProps.interface";

const Modal: React.FC<ModalProps> = ({ data, onClose, onSave, onDelete }) => {
  const defaultDate = data.date || new Date().toISOString().slice(0, 16);
  const defaultEndDate = data.event?.end || new Date(new Date(defaultDate).getTime() + 60 * 60 * 1000).toISOString().slice(0, 16);

  const [formData, setFormData] = useState({
    title: data.event?.title || '',
    date: defaultDate,
    endDate: defaultEndDate,
  });

  useEffect(() => {
    if (data.type === "create" && data.date) {
      setFormData({
        title: '',
        date: data.date.slice(0, 16),
        endDate: defaultEndDate,
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

     const fullDateTime = formData.date;

    if (data.type === "create") {
      onSave({
        id: Date.now(),
        title: formData.title,
        date: fullDateTime,
        endDate: formData.endDate,
      });
    } else if (data.type === "edit") {
      onSave({
        id: data.event!.id,
        title: formData.title,
        date: fullDateTime,
        endDate: formData.endDate,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-96 max-w-sm mx-4">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            {data.type === "create" ? "Create Appointment" : "Edit Appointment"}
          </h2>

          <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Date and Time</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="YYYY-MM-DD HH:MM"
              required
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mb-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {data.type === "create" ? "Save" : "Update"}
          </button>
          {data.type === "edit" && onDelete && (
            <button type="button" onClick={() => onDelete?.(data.event!.id)}>
              Delete
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 text-gray-600 bg-gray-300 hover:bg-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
