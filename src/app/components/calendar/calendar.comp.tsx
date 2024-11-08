/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CalendarHOC } from "@hoc";
import EventModal from "../event/EventModal";
import { Event, EventCategory } from "@models";
import getFormattedDate from "src/app/helpers/utils/getFormattedDate";

export default function CalendarComp() {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventModalData, setEventModalData] = useState<Event | undefined>();

  const [events, setEvents] = useState<Event[]>([
    {
      title: "Meeting with Team",
      start: "2024-11-15T10:00:00",
      end: "2024-11-15T12:00:00",
      reminder: true, // Boolean value to represent if reminder is set
      category: EventCategory.Event1, // Custom event category
      id: "event_2", // Custom event ID
    },
    {
      title: "Conference",
      start: "2024-11-20T09:00:00",
      end: "2024-11-20T11:00:00",
      reminder: true, // Boolean value to represent if reminder is set
      category: EventCategory.Event1, // Custom event category
      id: "event_1", // Custom event ID
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

  const onDateClick = () => {
    setModalVisible(true);
  };

  const onEventClick = (info: any) => {
    setEventModalData({
      title: info.event.title,
      start: getFormattedDate(info.event.start),
      end: getFormattedDate(info.event.end),
      reminder: info.event.extendedProps.reminder,
      category: info.event.extendedProps.category,
      id: info.event.id,
    });

    setModalVisible(true);
  };

  const clearModalEvent = () => {
    setModalVisible(false);
    setEventModalData(undefined);
  };

  const handleClose = () => {
    clearModalEvent();
  };

  const onSave = (event: any) => {
    setEvents([...events, event]);
  };

  const handleEventDrop = (info: any) => {
    const updatedEvents = events.map((event) => {
      if (event.title === info.event.title) {
        // Update the event with the new start and end time
        return {
          ...event,
          start: info.event.startStr, // FullCalendar provides the updated start time
          end: info.event.endStr, // FullCalendar provides the updated end time
        };
      }
      return event;
    });

    setEvents(updatedEvents); // Update the state with the new event times
  };

  // Function to check for reminders and trigger them
  const checkForReminders = () => {
    const now = new Date(); // Current time
    events.forEach((event: Event) => {
      const eventStart = new Date(event.start); // Event start time
      const reminderTime = new Date(eventStart.getTime() - 1 * 60000); // Reminder time

      // If the reminder time is less than the current time, trigger the reminder
      if (now >= reminderTime && now <= eventStart) {
        if (event.reminder) {
          event.reminder = false; // Mark the reminder as triggered
          alert(`Reminder: Event "${event.title}" is starting soon!`); // Display reminder message
        }
      }
    });
  };

  // Set up a useEffect hook to check reminders every minute
  useEffect(() => {
    const reminderInterval = setInterval(checkForReminders, 6000); // Check every minute
    return () => clearInterval(reminderInterval); // Cleanup on component unmount
  }, [events]);

  return (
    <>
      <EventModal
        open={modalVisible}
        onClose={handleClose}
        onSave={onSave}
        eventData={eventModalData}
      />

      <CalendarHOC
        events={events}
        views={views}
        onDateClick={onDateClick}
        onEventDrop={handleEventDrop}
        onEventClick={onEventClick}
      />
    </>
  );
}
