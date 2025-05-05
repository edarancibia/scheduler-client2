import { useEffect, useState } from "react";

const Prices = () => {
    const [diasRestantes, setDiasRestantes] = useState<number | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            const fechaCreacion = parsedUser?.createdAt;
            if (fechaCreacion) {
                const dias = calcularDiasRestantes(fechaCreacion);
                setDiasRestantes(dias);
            }
        }
    }, []);

    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const userCreationDate = parsedUser?.createdAt || "Usuario";

    const calcularDiasRestantes = (fechaCreacionStr: string): number => {
        const fechaCreacion = new Date(fechaCreacionStr);
        const ahora = new Date();
        const finPrueba = new Date(fechaCreacion);
        finPrueba.setDate(fechaCreacion.getDate() + 30);

        const diferenciaMs = finPrueba.getTime() - ahora.getTime();
        const dias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
        return dias > 0 ? dias : 0;
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-5">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Información de la prueba gratis</h2>
            <p className="text-center text-lg">
                {diasRestantes !== null ? (
                    <>
                        Te quedan <span className="font-semibold">{diasRestantes}</span> día{diasRestantes !== 1 && 's'} de prueba gratuita.
                    </>
                ) : (
                    'Cargando información de tu prueba gratuita...'
                )}
            </p>

            <p className="text-lg text-gray-700 mb-6">
                La prueba gratis vencerá 30 días después de haber creado tu cuenta. Luego de eso, se bloqueará tu acceso a menos que realices un pago de <strong>$15.990</strong> (Tu información no se perderá).
            </p>
            <p className="text-lg text-gray-700">
                Para obtener los datos de pago, envía un correo con el asunto <strong>"Solicito datos de transferencia"</strong> al correo <a href="mailto:soluciones.digital.mas@gmail.com" className="text-blue-500 hover:underline">soluciones.digital.mas@gmail.com</a>.
            </p>
        </div>
    );
};

export default Prices;
