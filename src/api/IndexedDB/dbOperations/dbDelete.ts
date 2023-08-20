export async function dbDelete(
  db: IDBDatabase,
  storeName: string,
  key: IDBValidKey | IDBKeyRange,
) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction([storeName], "readwrite")
      .objectStore(storeName)
      .delete(key)

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      console.error("Error on operation 'delete in IDBDatabase'", request.error)
      reject(request.error)
    }
  })
}
