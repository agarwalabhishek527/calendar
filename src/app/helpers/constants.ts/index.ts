import { EventCategory } from "@models";

export const EventColor: { [key in EventCategory]: string } = {
  [EventCategory.Event1]: "lightblue",
  [EventCategory.Event2]: "lightgreen",
  [EventCategory.Event3]: "lightcoral",
};
