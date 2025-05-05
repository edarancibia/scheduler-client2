import { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(false);
    setError('');

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}auth/forgot-password`, { email });
      setSent(true);
    } catch (err: any) {
      if (err.response?.data?.message === 'Usuario no encontrado') {
        setError('El correo ingresado no está registrado.');
      } else {
        setError('Ocurrió un error al intentar enviar el correo.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Recuperar contraseña</h2>

      {sent && (
        <div className="bg-green-500 text-white px-4 py-2 rounded">
          Te hemos enviado un enlace para restablecer tu contraseña.
        </div>
      )}

      {error && (
        <div className="bg-red-600 text-white px-4 py-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Correo electrónico</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
        >
          Enviar enlace de recuperación
        </button>
      </form>
    </div>
  );
}
