import { Event } from "@models";

export interface EventService {
  createEvent: (data: Event) => Promise<{
    status: "Success" | "Error" | string;
    data?: Event;
    message?: string;
  }>;

  updateEvent: (
    id: string,
    data: Event
  ) => Promise<{
    status: "Success" | "Error" | string;
    data?: Event;
    message?: string;
  }>;

  getAllEvent: () => Promise<{
    status: "Success" | "Error" | string;
    data: Array<Event>;
    message?: string;
  }>;
}
