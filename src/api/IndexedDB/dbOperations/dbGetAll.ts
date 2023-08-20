import { type TTrack } from "feature/Tracks"

export async function dbGetAll(
  db: IDBDatabase,
  storeName: string,
  key?: IDBValidKey | IDBKeyRange | null | undefined,
  count?: number | undefined,
): Promise<TTrack[]> {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction(storeName, "readonly")
      .objectStore(storeName)
      .getAll(key, count)

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      console.error("Error read DB", request.error)
      reject(request.error)
    }
  })
}
