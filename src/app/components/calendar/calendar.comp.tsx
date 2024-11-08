import React, { useState } from "react";
import { CalendarHOC } from "@hoc";

export default function CalendarComp() {
  const [events] = useState([
    {
      title: "Meeting with Team",
      start: "2024-11-15T10:00:00",
      end: "2024-11-15T12:00:00",
    },
    {
      title: "Conference",
      start: "2024-11-20T09:00:00",
      end: "2024-11-20T11:00:00",
    },
  ]);

  //   Customize the views
  const views = {
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

  return <CalendarHOC events={events} views={views} />;
}
