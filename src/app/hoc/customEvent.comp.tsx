import { EventCategory } from "@models";
import { EventContentArg } from "fullcalendar";
import { EventColor } from "../helpers/constants.ts";

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

export default CustomEvent;
