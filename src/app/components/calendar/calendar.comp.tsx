/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CalendarHOC } from "@hoc";
import { EventService, EventServiceImpl } from "@services";
import EventModal from "../event/EventModal";
import { Event } from "@models";
import getFormattedDate from "src/app/helpers/utils/getFormattedDate";
import { Container, CssBaseline } from "@mui/material";

const eventService: EventService = new EventServiceImpl();

export default function CalendarComp() {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventModalData, setEventModalData] = useState<Event | undefined>();

  const [events, setEvents] = useState<Event[]>([]);

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
    if (eventModalData) {
      const updatedEvents = events.map((e) => (e.id === event.id ? event : e));
      setEvents(updatedEvents);
      eventService.updateEvent(event.id, event);
    } else {
      setEvents([...events, event]);
      eventService.createEvent(event);
    }
  };

  const handleEventDrop = (info: any) => {
    const updatedEvents = events.map((event) => {
      if (event.id === info.event.id) {
        eventService.updateEvent(event.id, {
          ...event,
          start: info.event.startStr,
          end: info.event.endStr,
        });

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

  useEffect(() => {
    eventService
      .getAllEvent()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <EventModal
        open={modalVisible}
        onClose={handleClose}
        onSave={onSave}
        eventData={eventModalData}
      />
      <Container maxWidth="lg" style={{ padding: "10px" }}>
        <CssBaseline />
        <CalendarHOC
          events={events}
          views={views}
          onDateClick={onDateClick}
          onEventDrop={handleEventDrop}
          onEventClick={onEventClick}
        />
      </Container>
    </>
  );
}
