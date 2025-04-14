import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();

      localStorage.setItem("token", data.access_token);

      const userResponse = await fetch(`http://localhost:3000/users?email=${email}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${data.access_token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (!userResponse.ok) {
        throw new Error("Error obteniendo los datos del usuario");
      }
      
      const userData = await userResponse.json();
  
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("businessId", userData.businessId); 
      localStorage.setItem("businessName", userData.businessName); 
      setTimeout(() => navigate("/calendar"), 100); 

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Iniciar sesión</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-500 hover:text-white"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="text-center text-sm bg-white mt-3 mb-3">
          <a href="/forgot-password" className="text-gray-800 hover:underline">
            Olvidé mi contraseña
          </a>
        </p>
        <div>
          <p className="text-center w-full bg-green-600 text-white p-2 rounded hover:bg-green-500 hover:text-white">
            <Link to="/register" className="text-grey-500">Crear una cuenta</Link>
          </p>
      </div>
      </div>
    </div>
  );
};

export default Login;
