import { useEffect, useState } from "react";
import Card from "./Card";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const InviteUserRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailMatch, setEmailMatch] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [businessName, setBusinessName] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBusinessName = async () => {
      try {
        const res = await axios.get(`${apiUrl}/business/${1}`);
        setBusinessName(res.data.name);
      } catch (error) {
        setBusinessName("No disponible");
      }
    };
  
    fetchBusinessName();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    
    const { name, lastname, email, confirmEmail, password, confirmPassword, phone } = formData;

    if (email !== confirmEmail) {
      setEmailMatch(false);
      setTimeout(() => setEmailMatch(true), 5000);
      return;
    }

    if(password !== confirmPassword) {
      setPasswordMatch(false);
      setTimeout(() => setPasswordMatch(true), 5000);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, lastname, email, password, phone, role: 2 }),
      });

      //TODO: save businessid in user

      if (!response.ok) {
        throw new Error("Error en el registro. Inténtalo de nuevo.");
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/");
      }, 3000);

      setFormData({
        name: "",
        lastname: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        phone: ""
      });

    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      {showSuccess && (
        <div className="fixed top-4 w-11/12 max-w-md bg-green-600 text-white text-center py-2 px-4 rounded-lg shadow-md">
          Registro exitoso! Redirigiendo...
        </div>
      )}

      {error && (
        <div className="fixed top-4 w-11/12 max-w-md bg-red-600 text-white text-center py-2 px-4 rounded-lg shadow-md">
          {error}
        </div>
      )}

      {!emailMatch && (
        <div className="fixed top-4 w-11/12 max-w-md bg-red-600 text-white text-center py-2 px-4 rounded-lg shadow-md">
          Los correos electrónicos no coinciden
        </div>
      )}

      {!passwordMatch && (
        <div className="fixed top-4 w-11/12 max-w-md bg-red-600 text-white text-center py-2 px-4 rounded-lg shadow-md">
          Los contraseñas no coinciden
        </div>
      )}

      <Card className="w-full max-w-md p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Registro de Usuario</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
          <input
              type="text"
              name="business"
              value={businessName}
              className="w-full p-2 border rounded"
              readOnly
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Apellido"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              name="confirmEmail"
              value={formData.confirmEmail}
              onChange={handleChange}
              placeholder="Confirmar correo electrónico"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirma Contraseña"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Teléfono"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </Button>
          <div>
            <p className="text-center w-full bg-green-600 text-white p-2 rounded hover:bg-green-500 hover:text-white">
              <Link to="/">Ir a iniciar sesión</Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default InviteUserRegister;
