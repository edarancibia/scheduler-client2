import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Campaigns() {
    const [subject, setSubject] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
                setErrorMessage('');
            }, 5000);
    
            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage]);
    

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSuccessMessage('');
        setErrorMessage('');

        if (!image) {
            setErrorMessage('Debes seleccionar una imagen');
            return;
        }

        if (!scheduledDate) {
            setErrorMessage('Debes seleccionar una fecha válida');
            return;
        }

        const date = new Date(scheduledDate);
        if (isNaN(date.getTime())) {
            setErrorMessage('Fecha inválida');
            return;
        }

        if (!scheduledTime || !/^\d{2}:\d{2}$/.test(scheduledTime)) {
            setErrorMessage('Debes ingresar una hora válida en formato HH:mm');
            return;
        }

        const [hour, minute] = scheduledTime.split(':');
        const businessId = localStorage.getItem("businessId");

        if (!businessId) {
            setErrorMessage('No se encontró el businessId');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', subject);
        formData.append('businessId', String(Number(businessId)));
        formData.append('executionDate', date.toString());
        formData.append('hour', hour);
        formData.append('minute', minute);

        try {
            await axios.post(`${apiUrl}/campaigns/create`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const localDateTime = new Date(`${scheduledDate}T${hour}:${minute}`);
            const formattedDate = `${localDateTime.getDate().toString().padStart(2, '0')}/${(localDateTime.getMonth() + 1).toString().padStart(2, '0')
                }/${localDateTime.getFullYear()} ${hour}:${minute}`;


            setSuccessMessage(`Campaña programada correctamente, será enviada en ${formattedDate}`);
            setSubject('');
            setImage(null);
            setPreviewUrl(null);
            setScheduledDate('');
            setScheduledTime('');
        } catch (error) {
            console.error(error);
            setErrorMessage('Error al crear la campaña');
        }
    };

    return (
        <div className="flex flex-col items-center mt-5">
            {successMessage && (
                <div className="fixed top-4 w-11/12 max-w-md bg-green-600 text-white text-center py-2 px-4 rounded-lg shadow-md z-50">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="fixed top-4 w-11/12 max-w-md bg-red-600 text-white text-center py-2 px-4 rounded-lg shadow-md z-50">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-4 bg-white rounded-xl shadow">
                <div>
                    <label className="block font-medium">Asunto del correo</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        maxLength={100}
                        required
                        className="w-full border rounded p-2"
                        placeholder='Máximo 100 caracteres'
                    />
                </div>

                <div>
                    <input
                        type="file"
                        accept="image/*"
                        id="imageUpload"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <label
                        htmlFor="imageUpload"
                        className="inline-block cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 transition"
                    >
                        Seleccionar imagen
                    </label>
                </div>

                {previewUrl && (
                    <div>
                        <p className="font-medium">Vista previa:</p>
                        <img src={previewUrl} alt="Vista previa" className="max-w-full h-auto rounded mb-2" />
                        <button
                            type="button"
                            onClick={() => {
                                setImage(null);
                                setPreviewUrl(null);
                            }}
                            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            Quitar imagen
                        </button>
                    </div>
                )}

                <div>
                    <label className="block font-medium">Fecha de envío</label>
                    <input
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        required
                        className="w-full border rounded p-2"
                    />
                </div>

                <div>
                    <label className="block font-medium">Hora de envío</label>
                    <input
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        required
                        className="w-full border rounded p-2"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 w-full rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 transition"
                >
                    Programar campaña
                </button>
            </form>
        </div>
    );
}

