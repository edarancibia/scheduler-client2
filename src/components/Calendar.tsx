import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es"; 
import { CalendarProps } from "../types/CalendarProps.type";
import React from "react";

const Calendar: React.FC<CalendarProps> = ({ events, onDateClick, onEventClick, onSlotClick }) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      locale={esLocale}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      businessHours={{
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: "08:00",
        endTime: "20:00",
      }}
      selectConstraint={{
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: "08:00",
        endTime: "20:00",
      }}
      buttonText={{
        month: "Mes",
        week: "Semana",
        day: "Día",
        today: "Hoy",
      }}
      slotMinTime="08:00:00"
      slotMaxTime="20:00:00"
      hiddenDays={[0]}
      expandRows={true}
      events={events}
      selectable={true}
      select={(info) => onSlotClick({ startStr: info.startStr, endStr: info.endStr })}
      dateClick={(info) => onDateClick(new Date(info.date))}
      eventClick={(info) => onEventClick(info.event)}
    />
  );
};

export default Calendar;
