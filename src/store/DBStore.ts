/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  dbDelete, dbGetAll, dbOpen, dbPut,
} from "api/IndexedDB"

class DBStore {
  private db: IDBDatabase | undefined

  async init() {
    return dbOpen().then(result => {
      this.db = result
    })
  }

  async addRow(storeName: string, value: any, key?: IDBValidKey) {
    if (!this.db) {
      await this.init()
    }
    return dbPut(this.db!, storeName, value, key)
  }

  async getAll(storeName: string) {
    if (!this.db) {
      await this.init()
    }
    return dbGetAll(this.db!, storeName)
  }

  async deleteRow(storeName: string, key: IDBValidKey | IDBKeyRange) {
    if (!this.db) {
      await this.init()
    }
    return dbDelete(this.db!, storeName, key)
  }
}

export const dbStore = new DBStore()
