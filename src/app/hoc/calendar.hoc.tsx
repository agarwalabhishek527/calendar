// src/components/Calendar.tsx
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // Month view
import timeGridPlugin from "@fullcalendar/timegrid"; // Day and Week view
import listPlugin from "@fullcalendar/list"; // List view
import interactionPlugin, {
  DateClickArg,
  EventDragStopArg,
} from "@fullcalendar/interaction"; // Interaction features
import {
  EventClickArg,
  EventDropArg,
  EventSourceInput,
  EventContentArg,
} from "fullcalendar";
import { EventColor } from "../helpers/constants.ts";
import { EventCategory } from "@models";

const CustomEvent = (props: { customEvent: EventContentArg }) => {
  const category: EventCategory =
    props.customEvent.event.extendedProps.category;
  // Render a custom event component with event details
  return (
    <div
      style={{
        backgroundColor: EventColor[category],
        padding: "5px",
        width: "100%",
      }}
    >
      <strong>{props.customEvent.event.title}</strong>
      <br />
      <small>{props.customEvent?.event?.start?.toLocaleString()}</small>
    </div>
  );
};

//   Customize the views
const defaultViews = {
  dayGridMonth: {
    // Month view
    buttonText: "Month",
  },
  timeGridWeek: {
    // Week view
    buttonText: "Week",
  },
  timeGridDay: {
    // Day view
    buttonText: "Day",
  },
  listMonth: {
    // List view (can be used to show events in a list)
    buttonText: "List",
  },
};

interface ICalendarProps {
  events: EventSourceInput;
  onEventClick?: (info: EventClickArg) => void;
  onDateClick?: (info: DateClickArg) => void;
  onEventDrop?: (info: EventDropArg) => void;
  onEventDragStop?: (info: EventDragStopArg) => void;
  handleCreateClick?: () => void;
  views?:
    | {
        [viewId: string]: { buttonText: string }; // Add this type
      }
    | undefined;
}

const Calendar: React.FC<ICalendarProps> = (props: ICalendarProps) => {
  const {
    views = defaultViews,
    events,
    onEventClick,
    onDateClick,
    onEventDrop,
    onEventDragStop,
    handleCreateClick,
  } = props;

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth" // Default view to show initially
        views={views} // Define the views (Day, Month, Year)
        events={events} // Event data
        headerToolbar={{
          left: "prev,next today", // Navigation buttons
          center: "title", // Title in the center
          right: "createEvent,dayGridMonth,timeGridWeek,timeGridDay,listMonth", // Buttons for the views
        }}
        customButtons={{
          createEvent: {
            text: "Create Event", // Button text
            click: handleCreateClick, // Attach custom button click handler
          },
        }}
        eventClick={onEventClick}
        dateClick={onDateClick}
        eventDragStop={onEventDragStop}
        eventDrop={onEventDrop}
        droppable={true}
        editable={true}
        eventContent={(eventInfo) => <CustomEvent customEvent={eventInfo} />} // Custom rendering of events
      />
    </div>
  );
};

export default Calendar;
