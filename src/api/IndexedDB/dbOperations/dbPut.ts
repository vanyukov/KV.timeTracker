export async function dbPut(
  db: IDBDatabase,
  storeName: string,
  value: any,
  key?: IDBValidKey,
) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction([storeName], "readwrite")
      .objectStore(storeName)
      .put(value, key)

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      console.error("Error on operation 'put in IDBDatabase'", request.error)
      reject(request.error)
    }
  })
}
