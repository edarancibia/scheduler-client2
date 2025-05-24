import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import Modal from "./modals/Modal";
import { useNavigate } from "react-router-dom";
import { EventClickArg } from "@fullcalendar/core";
import EventDetailModal from "./modals/EditEvent.modal";

const CalendarPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchEvents = async () => {
    try {
      const businessId = localStorage.getItem("businessId");
      const token = localStorage.getItem("token");

      if (!businessId) return;

      const response = await fetch(
        `${apiUrl}/appointments/by-business/${businessId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      const transformed = data.map((event: any) => {
        const localStart = new Date(event.date);
        const localEnd = new Date(event.dateEnd);
      
        return {
          id: event.id,
          title: event.service,
          start: localStart.toISOString().slice(0, 19),
          end: localEnd.toISOString().slice(0, 19),
          status: event.status,
          customer: event.customer,
          color: event.status.id === 2 ? "#4ade80" : undefined,
        };
      });

      setEvents(transformed);
    } catch (error) {
      console.log("error al obtener eventos");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSlotClick = (selection: { startStr: string; endStr: string }) => {
    const start = new Date(selection.startStr);
    const end = new Date(start.getTime() + 30 * 60 * 1000); 

    setSelectedTime({
      start: selection.startStr,
      end: end.toISOString(),
    });
    setIsModalOpen(true);
  };

  const handleDateClick = (date: Date) => {
    const isoDate = date.toISOString();

    const start = date;
    const end = new Date(start.getTime() + 30 * 60 * 1000);
  
    setSelectedTime({
      start: isoDate,
      end: end.toISOString(),
    });
  
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
      const businessId = localStorage.getItem("businessId");
      const customerId = eventData.customerId;

      const response = await fetch(`${apiUrl}/appointments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      fetchEvents();
    } catch (error) {
      console.error("Error al guardar el evento:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchEvents();
  };

  const handleEventClick = async (clickInfo: EventClickArg) => {
    const eventId = clickInfo.event.id;

    fetchEventById(Number(eventId));
  };

  const fetchEventById = async (eventId: number) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${apiUrl}/appointments/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener el evento");
      }

      const event = await response.json();

      setSelectedEvent(event);
      setIsDetailModalOpen(true);
    } catch (error) {
      console.error("Error al obtener el evento:", error);
    }
  };

  const updateEventStatus = async (eventId: number, statusId: number) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${apiUrl}/appointments/${eventId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ statusId }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el estado del evento");
    }

    return await response.json();
  };

  const handleConfirm = async () => {
    if (!selectedEvent) return;

    try {
      const updated = await updateEventStatus(selectedEvent.id, 2);
      setEvents((prev) =>
        prev.map((event: any) =>
          event.id === updated.id ? { ...event, status: updated.status } : event
        )
      );
      setIsDetailModalOpen(false);
      fetchEvents();
    } catch (err) {
      console.error("Error al confirmar evento", err);
    }
  };

  const handleCancelEvent = async () => {
    if (!selectedEvent) return;

    try {
      const updated = await updateEventStatus(selectedEvent.id, 3);
      setEvents((prev) =>
        prev.map((event: any) =>
          event.id === updated.id ? { ...event, status: updated.status } : event
        )
      );
      setIsDetailModalOpen(false);
      fetchEvents();
    } catch (err) {
      console.error("Error al cancelar evento", err);
    }
  };

  return (
    <div className="calendar-page relative mr-10 ml-10">
      <Calendar
        events={events}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
        onSlotClick={handleSlotClick}
      />
      {isModalOpen && selectedTime && (
        <Modal
          data={{
            date: {
              start: selectedTime.start,
              end: selectedTime.end,
            },
          }}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}
      {isDetailModalOpen && selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setIsDetailModalOpen(false)}
          onConfirm={handleConfirm}
          onCancelEvent={handleCancelEvent}
        />
      )}
    </div>
  );
};

export default CalendarPage;
