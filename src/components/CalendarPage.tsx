import { useEffect, useState } from "react";
import { ModalData } from "../types/modalData.type";
import Calendar from "./Calendar";
import Modal from "./Modal";

const CalendarPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<{
    start: string;
    end: string;
  } | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/appointments/5/2");
        const data = await response.json();

        console.log(data);

        setEvents(data);
      } catch (error) {
        console.log("error al  obtener eventos");
      }
    };

    fetchEvents();
  }, []);

  const handleSlotClick = (selection: { startStr: string; endStr: string }) => {
    setSelectedTime({
      start: selection.startStr,
      end: selection.endStr,
    });
    setIsModalOpen(true);
  };

  const handleDateClick = (date: Date) => {
    setModalData({ date, type: "create" });
    setIsModalOpen(true);
  };

  const handleSave = async (eventData: { id: number; title: string; date: string; endDate: string }) => {
    try {
      const response = await fetch("http://localhost:3000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: eventData.title,
          start: eventData.date,
          end: eventData.endDate,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al guardar el evento");
      }
  
      const newEvent = await response.json();
  
      // Actualizar el estado con el nuevo evento
      setEvents((prevEvents) => [...prevEvents, newEvent]);
  
      // Cerrar el modal
      setIsModalOpen(false);
      setModalData(null);
    } catch (error) {
      console.error("Error al guardar el evento:", error);
    }
  };

  // const handleEventClick = (event: Event) => {
  //   setModalData({ event, type: 'edit' });
  //   setIsModalOpen(true);
  // };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <div className="calendar-page">
      <Calendar
        events={events}
        onDateClick={handleDateClick}
        onEventClick={() => {}}
        onSlotClick={handleSlotClick}
      />
      {isModalOpen && selectedTime && (
      <Modal
        data={{ type: "create", date: selectedTime?.start }}
        onClose={handleModalClose}
        onSave={handleSave}
      >
        <h2 className="text-xl font-bold mb-4">Crear Evento</h2>
        <div className="mb-2">
          <label className="block text-gray-600">Hora de Inicio</label>
          <input
            type="text"
            value={selectedTime?.start || ""}
            readOnly
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Hora de Fin</label>
          <input
            type="text"
            value={selectedTime?.end || ""}
            readOnly
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleModalClose}
          className="bg-red-500 text-white p-2 rounded"
        >
          Cerrar
        </button>
      </Modal>
      )}
    </div>
  );
};

export default CalendarPage;
