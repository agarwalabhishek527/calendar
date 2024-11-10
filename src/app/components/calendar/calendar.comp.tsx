/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";

import { EventService, EventServiceImpl } from "@services";
import { CalendarWrapper } from "@components/shared";
import { getFormattedDate } from "@helpers";
import { Event } from "@models";

import EventModal from "../event/EventModal";
import useAddReminder from "./useAddReminder";

const eventService: EventService = new EventServiceImpl();

export default function CalendarComp() {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventModalData, setEventModalData] = useState<Event | undefined>();

  const [events, setEvents] = useState<Event[]>([]);

  //Hooks to add reminders
  useAddReminder(events);

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

  const onSaveEvent = (event: any) => {
    if (eventModalData) {
      const updatedEvents = events.map((e) => (e.id === event.id ? event : e));
      setEvents(updatedEvents);
      eventService.updateEvent(event.id, event);
    } else {
      setEvents([...events, event]);
      eventService.createEvent(event);
    }
  };

  const onDeleteEvent = (id: string) => {
    if (eventModalData) {
      eventService.deleteEvent(id);
      setEvents(events.filter((event) => event.id !== id));
      clearModalEvent();
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

  const getAllEvents = async () => {
    try {
      const response = await eventService.getAllEvent();
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <>
      <EventModal
        open={modalVisible}
        onClose={handleClose}
        onSave={onSaveEvent}
        eventData={eventModalData}
        onDeleteEvent={onDeleteEvent}
      />
      <Container maxWidth="lg" style={{ padding: "10px" }}>
        <CssBaseline />
        <CalendarWrapper
          events={events}
          onDateClick={onDateClick}
          onEventDrop={handleEventDrop}
          onEventClick={onEventClick}
          handleCreateClick={onDateClick}
        />
      </Container>
    </>
  );
}
