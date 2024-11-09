import { Event } from "@models";
import { APIServiceImpl } from "../api";

import { EventService } from "./event.service";
import { IDBStorage } from "../storage/idb-storage";
import { StorageClient } from "../storage/storage.service";

const IdbStorage: StorageClient = new IDBStorage();

export default class EventServiceImpl
  extends APIServiceImpl
  implements EventService
{
  static readonly RESOURCE = "/users";

  async createEvent(data: Event) {
    const randomId = Math.random().toString(36).substring(7);
    data.id = randomId;

    await IdbStorage.set(randomId, JSON.stringify(data));
    return Promise.resolve({ status: "Success", data });
  }

  async updateEvent(id: string, data: Event) {
    const event = await IdbStorage.get(id);
    if (!event) {
      return Promise.reject({ status: "Error", message: "Event not found" });
    }

    await IdbStorage.set(id, JSON.stringify(data));
    return Promise.resolve({ status: "Success", data });
  }

  async getAllEvent() {
    const events: Event[] = await IdbStorage.getAll();

    return Promise.resolve({ status: "Success", data: events });
  }
}
