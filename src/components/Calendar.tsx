import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { CalendarProps } from "../types/CalendarProps.type";
import React, { useRef } from "react";

const Calendar: React.FC<CalendarProps> = ({
  events,
  onDateClick,
  onEventClick,
  onSlotClick,
}) => {
  const calendarRef = useRef<any>(null);
  
  return (
    <FullCalendar
      timeZone="local"
      ref={calendarRef}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      locale={esLocale}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      businessHours={{
        daysOfWeek: [1, 2, 3, 4, 5, 6],
        startTime: "08:00",
        endTime: "20:00",
      }}
      selectConstraint={{
        daysOfWeek: [1, 2, 3, 4, 5, 6],
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
      select={(info) =>
        onSlotClick({ startStr: info.startStr, endStr: info.endStr })
      }
      dateClick={(info) => {
        onDateClick(new Date(info.date));
      }}      
      eventClick={(info) => onEventClick(info)}
      height="auto"
      views={{
        timeGridWeek: {
          slotMinHeight: 20,
        },
        timeGridDay: {
          slotMinHeight: 20,
        },
      }}
    />
  );
};

export default Calendar;
