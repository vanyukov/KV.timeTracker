import { type TTrack } from "feature/Tracks"

export async function dbGetAll(
  db: IDBDatabase,
  storeName: string,
  key?: IDBValidKey | IDBKeyRange | null | undefined,
  index?: string,
  count?: number | undefined,
): Promise<TTrack[]> {
  return new Promise((resolve, reject) => {
    const objectStore = db
      .transaction(storeName, "readonly")
      .objectStore(storeName)

    const request = (
      index ? objectStore.index(index ?? "") : objectStore
    ).getAll(key, count)

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      console.error("Error read DB", request.error)
      reject(request.error)
    }
  })
}
