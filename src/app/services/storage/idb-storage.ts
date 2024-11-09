import { StorageClient } from "./storage.service";
import { openDB, IDBPDatabase } from "idb";

const database = "product-calendar";
const collection = "events";

export class IDBStorage implements StorageClient {
  dbPromise: Promise<IDBPDatabase | null>;
  isAvailable = typeof indexedDB !== "undefined";

  constructor() {
    if (this.isAvailable) {
      this.dbPromise = openDB(database, 1, {
        upgrade(db) {
          try {
            if (!db.objectStoreNames.contains(collection)) {
              const store = db.createObjectStore(collection);
              store.createIndex("date", "date");
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error("🚀 ~ Error creating object stores:", error);
          }
        },
      });
    } else {
      this.dbPromise = Promise.resolve(null);
    }
  }

  async get(key: string): Promise<string | undefined> {
    return (await this.dbPromise)
      ?.get(collection, key)
      .then((res) => JSON.parse(res?.data));
  }

  async set(key: string, value: string): Promise<void> {
    await (
      await this.dbPromise
    )?.put(
      collection,
      { data: value, date: +new Date().setHours(0, 0, 0, 0) },
      key
    );
  }

  async delete(key: string): Promise<void> {
    await (await this.dbPromise)?.delete(collection, key);
  }

  async clear(): Promise<void> {
    await (await this.dbPromise)?.clear(collection);
  }

  async getAll(): Promise<Array<string | undefined>> {
    return (
      (await this.dbPromise)
        ?.getAll(collection)
        .then((res) => res.map((eachRes) => JSON.parse(eachRes.data))) || []
    );
  }
}
