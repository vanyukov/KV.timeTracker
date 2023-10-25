/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  dbDelete, dbGet, dbGetAll, dbOpen, dbPut,
} from "api/IndexedDB"

class DBStore {
  private db: IDBDatabase | undefined

  async init() {
    return dbOpen().then(result => {
      this.db = result
    })
  }

  async put(storeName: string, value: any, key?: IDBValidKey) {
    if (!this.db) {
      await this.init()
    }
    return dbPut(this.db!, storeName, value, key)
  }

  async get<T>(
    storeName: string,
    key: IDBValidKey | IDBKeyRange,
  ) {
    if (!this.db) {
      await this.init()
    }
    return dbGet<T>(this.db!, storeName, key)
  }

  async getAll<T>(
    storeName: string,
    key?: IDBValidKey | IDBKeyRange | null,
    index?: string,
    count?: number,
  ) {
    if (!this.db) {
      await this.init()
    }
    return dbGetAll<T>(this.db!, storeName, key, index, count)
  }

  async delete(storeName: string, key: IDBValidKey | IDBKeyRange) {
    if (!this.db) {
      await this.init()
    }
    return dbDelete(this.db!, storeName, key)
  }
}

export const dbStore = new DBStore()
