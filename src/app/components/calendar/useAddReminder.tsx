/* eslint-disable react-hooks/exhaustive-deps */
import { Event } from "@models";
import { useEffect } from "react";

const useAddReminder = (events: Event[]) => {
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
    const reminderInterval = setInterval(checkForReminders, 30000); // Check every 30sec
    return () => clearInterval(reminderInterval); // Cleanup on component unmount
  }, [events]);
};

export default useAddReminder;
