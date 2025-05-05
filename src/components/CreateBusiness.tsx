import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBusiness = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setSuccessMessage("Error: No se encontró el usuario.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}business`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, address, phone, userId: parseInt(userId) }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el negocio");
      }

      localStorage.removeItem('userId');

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/login");
      }, 3000);

      setName("");
      setAddress("");
      setPhone("");
      setSuccessMessage("Negocio creado exitosamente");

    } catch (error: any) {
      setSuccessMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {showSuccess && (
        <div className="fixed top-4 w-11/12 max-w-md bg-green-600 text-white text-center py-2 px-4 rounded-lg shadow-md">
          Tu negocio fueNegocio creado existosamente! Serás redirigido a iniciar sesión...
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Crear Negocio</h2>
        
        {successMessage && (
          <p className="text-center p-2 rounded bg-green-600 text-white">
            {successMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Dirección</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Teléfono</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-500"
          >
            Crear Negocio
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBusiness;
