import { EventInput } from '@fullcalendar/core';

export type CalendarProps = {
  events: EventInput[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: any) => void;
  onSlotClick: (selection: { startStr: string; endStr: string }) => void;
}
