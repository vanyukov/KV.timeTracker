export async function dbGet<T>(
  db: IDBDatabase,
  storeName: string,
  key: IDBValidKey | IDBKeyRange,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction(storeName, "readonly")
      .objectStore(storeName)
      .get(key)

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      console.error("Error read DB", request.error)
      reject(request.error)
    }
  })
}
