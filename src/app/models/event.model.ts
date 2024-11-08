export enum EventCategory {
  Event1 = "Event1",
  Event2 = "Event2",
  Event3 = "Event3",
}

export class Event {
  title: string;
  start: string;
  end: string;
  id: string;
  reminder: boolean;
  category: EventCategory;

  constructor(event: any) {
    this.title = event.title;
    this.start = event.start;
    this.end = event.end;
    this.id = event.id;
    this.reminder = event.reminder;
    this.category = event.category;
  }
}
