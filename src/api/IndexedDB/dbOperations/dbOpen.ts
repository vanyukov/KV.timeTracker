import { tracksDB } from "feature/Tracks/tracksDB"
import { clientsDB } from "feature/Clients"
import { projectsDB } from "feature/Projects"
import { dbInfo } from "../dbInfo"

const stores = [tracksDB, clientsDB, projectsDB]

export async function dbOpen(): Promise<IDBDatabase> {
  return new Promise(resolve => {
    const dbReq = indexedDB.open(dbInfo.name, dbInfo.version)
    dbReq.onupgradeneeded = event => {
      if (!event.target) {
        return
      }
      // @ts-expect-error
      const db = event.target.result
      stores.forEach(store => {
        if (!db.objectStoreNames.contains(store.title)) {
          const objectStore = db.createObjectStore(store.title, store.keys)
          store.index.forEach((item: { name: any, options: any }) => {
            objectStore.createIndex(item.name, item.name, item.options)
          })
        }
      })
      resolve(db)
    }
    dbReq.onsuccess = () => {
      resolve(dbReq.result)
    }
  })
}
