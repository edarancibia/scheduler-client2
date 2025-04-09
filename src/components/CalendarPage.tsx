import { useEffect, useState } from "react";
import { ModalData } from "../types/modalData.type";
import Calendar from "./Calendar";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const CalendarPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<{
    start: string;
    end: string;
  } | null>(null);

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const businessId = localStorage.getItem("businessId");
      const token = localStorage.getItem('token');

      if (!businessId) return;

      const response = await fetch(`http://localhost:3000/appointments/${businessId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      const transformed = data.map((event: any) => ({
        id: event.id,
        title: `${event.customer.name} ${event.customer.lastname}`,
        start: event.date,
        end: event.dateEnd,
        status: event.status,
        customer: event.customer,
      }));

      setEvents(transformed);
    } catch (error) {
      console.log("error al obtener eventos");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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

  const handleSave = async (eventData: {
    id: number;
    title: string;
    date: string;
    endDate: string;
    customerId: number;
  }) => {
    try {
      const businessId = localStorage.getItem('businessId');
      const customerId = eventData.customerId;

      const response = await fetch("http://localhost:3000/appointments", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: eventData.title,
          businessId: Number(businessId),
          customerId: Number(customerId),
          date: eventData.date,
          dateEnd: eventData.endDate,
          statusId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el evento");
      }

      setIsModalOpen(false);
      setModalData(null);
      fetchEvents();
    } catch (error) {
      console.error("Error al guardar el evento:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalData(null);
    fetchEvents();
  };

  return (
    <div className="calendar-page relative mr-10 ml-10">
      <Calendar
        events={events}
        onDateClick={handleDateClick}
        onEventClick={() => {}}
        onSlotClick={handleSlotClick}
      />
      {isModalOpen && selectedTime && (
        <Modal
          data={{
            type: "create",
            date: {
              start: selectedTime.start,
              end: selectedTime.end,
            },
          }}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default CalendarPage;