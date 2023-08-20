import { type TTrack } from "feature/Tracks"

export async function dbGetAllWithKeys(
  db: IDBDatabase,
  storeName: string,
  key?: IDBValidKey | IDBKeyRange | null,
  direction?: IDBCursorDirection,
): Promise<TTrack[]> {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction(storeName, "readonly")
      .objectStore(storeName)
      .openCursor(key, direction)

    request.onsuccess = (event) => {
      const result: any[] | PromiseLike<TTrack[]> = []
      // @ts-expect-error
      const cursor = event?.target?.result
      if (cursor) {
        result.push({
          key: cursor.primaryKey,
          ...cursor.value,
        })
        cursor.continue()
      } else {
        resolve(result)
      }
    }

    request.onerror = () => {
      console.error("Error read DB", request.error)
      reject(request.error)
    }
  })
}
