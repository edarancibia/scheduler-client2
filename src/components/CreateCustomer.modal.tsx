import { useState } from "react";

interface CreateCustomerModalProps {
  onClose: () => void;
  onSave: (customer: {
    name: string;
    lastname: string;
    email?: string;
    phone?: string;
  }) => void;
}

const CreateCustomerModal: React.FC<CreateCustomerModalProps> = ({
  onClose,
  onSave,
}) => {
  const [customerData, setCustomerData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    businessId: Number(localStorage.getItem('businessId')),
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSaveCustomer = async () => {
    try {
      const response = await fetch(`${apiUrl}/customers`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
        body: JSON.stringify(customerData),
      });
  
      if (!response.ok) {
        throw new Error("Error al guardar el cliente");
      }
  
      const newCustomer = await response.json();
      onSave(newCustomer);
      onClose();
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Crear Cliente
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={customerData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Apellido
            </label>
            <input
              type="text"
              name="lastname"
              value={customerData.lastname}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Correo Electrónico (Opcional)
            </label>
            <input
              type="email"
              name="email"
              value={customerData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Teléfono (Opcional)
            </label>
            <input
              type="text"
              name="phone"
              value={customerData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={handleSaveCustomer}
            className="w-full py-3 mb-4 bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Guardar Cliente
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 text-gray-600 bg-gray-300 hover:bg-gray-400 rounded-lg focus:ring-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomerModal;
