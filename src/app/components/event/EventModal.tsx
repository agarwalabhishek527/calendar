import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Event, EventCategory } from "@models";

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
  eventData?: Event;
}

const EventModal = (props: EventModalProps) => {
  const { open, onClose, onSave, eventData, onDeleteEvent } = props;

  const [eventName, setEventName] = useState("");
  const [id, setId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reminder, setReminder] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (eventData) {
      setEventName(eventData.title);
      setStartTime(eventData.start);
      setEndTime(eventData.end);
      setReminder(eventData.reminder);
      setCategory(eventData.category);
      setId(eventData.id);
    } else {
      setEventName("");
      setStartTime("");
      setEndTime("");
      setReminder(false);
      setCategory("");
      setId("");
    }
  }, [eventData]);

  const handleSave = () => {
    if (endTime < startTime) {
      alert("End time cannot be before start time!");
      return;
    }

    if (eventName && category && startTime && endTime && eventName) {
      onSave(
        new Event({
          title: eventName,
          start: startTime,
          end: endTime,
          reminder,
          category: category as EventCategory,
          id,
        })
      );
      onClose();
    } else {
      alert("Please fill in all fields!");
    }
  };

  const handleDelete = () => {
    if (eventData) onDeleteEvent(eventData.id);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>{eventData ? "Update" : "Create"} Event</h2>

        {/* Event Name */}
        <TextField
          label="Event Name"
          fullWidth
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          type="datetime-local"
          label="Start Time"
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
          value={startTime}
          onChange={
            (e) => setStartTime(e.target.value) // Update the state
          }
          sx={{ marginBottom: 2 }}
        />

        {/* Timings */}
        <TextField
          type="datetime-local"
          label="End Time"
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {/* Reminder Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={reminder}
              onChange={(e) => setReminder(e.target.checked)}
            />
          }
          label="Set Reminder"
        />

        {/* Category Dropdown */}
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as EventCategory)}
            label="Category"
          >
            {Object.keys(EventCategory).map((category) => (
              <MenuItem value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Save Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 2,
            gap: 2,
          }}
        >
          {eventData && (
            <Button variant="contained" onClick={handleDelete}>
              Delete Event
            </Button>
          )}
          <Button variant="contained" onClick={handleSave}>
            Save Event
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EventModal;
