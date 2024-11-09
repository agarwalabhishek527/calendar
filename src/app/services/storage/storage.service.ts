export type StorageClient = {
  set: (key: string, value: string) => Promise<void>;
  get: (key: string) => Promise<string | undefined>;
  delete: (key: string) => Promise<void>;
  clear: () => Promise<void>;
  getAll: () => Promise<any[]>;
  isAvailable?: boolean;
};
