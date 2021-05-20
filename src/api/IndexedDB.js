import tracks from './db/tracks'
import settings from './db/settings'
import comments from './db/comments'
import clients from './db/clients'
import clientSites from './db/clientSites'
import utzJobTypes from './db/utzJobTypes'
const IDBExportImport = require('indexeddb-export-import')

const dbInfo = {
  name: 'TimeTracks',
  version: 3,
}
const stores = {
  tracks,
  settings,
  comments,
  clients,
  clientSites,
  utzJobTypes,
}

export function openDB() {
  return new Promise((resolve, reject) => {
    const dbReq = indexedDB.open(dbInfo.name, dbInfo.version)
    dbReq.onupgradeneeded = (event) => {
      const db = event.target.result
      for (let store in stores) {
        if (!db.objectStoreNames.contains(store)) {
          const objectStore = db.createObjectStore(store, stores[store].keys)
          stores[store].index.forEach((item) => {
            objectStore.createIndex(item.name, item.name, item.options)
          })
        }
      }
      resolve(db)
    }
    dbReq.onsuccess = () => {
      resolve(dbReq.result)
    }
  })
}

export function put(db, store, value, key) {
  return new Promise((resolve, reject) => {
    if (!db) {
      resolve(null)
    }

    const transaction = db.transaction(store, 'readwrite')
    const dbStore = transaction.objectStore(store)
    let request = dbStore.put({ ...value }, key)

    request.onsuccess = function () {
      resolve(request.result)
    }

    request.onerror = function () {
      console.error('Ошибка', request.error)
      reject(request.error)
    }
  })
}

export function del(db, store, key) {
  return new Promise((resolve, reject) => {
    if (!db) {
      resolve(null)
    }

    const transaction = db.transaction([store], 'readwrite')
    const dbStore = transaction.objectStore(store)
    const request = dbStore.delete(key)

    request.onsuccess = function () {
      resolve(request.result)
    }

    request.onerror = function () {
      console.error('Ошибка', request.error)
      reject(request.error)
    }
  })
}

export function get(db, store, key) {
  return new Promise((resolve, reject) => {
    if (!db) {
      resolve(null)
    }

    const transaction = db.transaction(store, 'readonly')
    const dbStore = transaction.objectStore(store)
    const request = dbStore.get(key)

    request.onsuccess = function () {
      resolve(request.result)
    }

    request.onerror = function () {
      console.error('Ошибка', request.error)
      reject(request.error)
    }
  })
}

export function getAll(db, store) {
  return new Promise((resolve, reject) => {
    if (!db) {
      resolve(null)
    }

    const transaction = db.transaction(store, 'readonly')
    const dbStore = transaction.objectStore(store)
    const request = dbStore.getAll()

    request.onsuccess = function () {
      resolve(request.result)
    }

    request.onerror = function () {
      console.error('Ошибка', request.error)
      reject(request.error)
    }
  })
}

export function getAllWithKeys(db, store) {
  return new Promise((resolve, reject) => {
    if (!db) {
      resolve(null)
    }

    const transaction = db.transaction(store, 'readonly')
    const dbStore = transaction.objectStore(store)
    const request = dbStore.openCursor()
    const result = []

    request.onsuccess = function (event) {
      let cursor = event.target.result
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

    request.onerror = function () {
      console.error('Ошибка', request.error)
      reject(request.error)
    }
  })
}

export function clean(db, store) {
  return new Promise((resolve, reject) => {
    if (!db) {
      resolve(null)
    }

    const transaction = db.transaction(store, 'readwrite')
    const dbStore = transaction.objectStore(store)
    const request = dbStore.delete(IDBKeyRange.lowerBound(1, true))

    request.onsuccess = function () {
      resolve(request.result)
    }

    request.onerror = function () {
      console.error('Ошибка', request.error)
      reject(request.error)
    }
  })
}

export function exportToJsonString(db) {
  return new Promise((resolve, reject) => {
    IDBExportImport.exportToJsonString(db, function (err, jsonString) {
      if (err) {
        console.error(err)
      } else {
        resolve(jsonString)
      }
    })
  }).catch(function (e) {
    console.error(e)
  })
}

export function clearDatabase(db) {
  return new Promise((resolve, reject) => {
    IDBExportImport.clearDatabase(db, resolve)
  })
}

export function importFromJsonString(db, jsonString) {
  return new Promise((resolve, reject) => {
    IDBExportImport.importFromJsonString(db, jsonString, function (err) {
      if (err) {
        console.error(err)
        reject(false)
      } else {
        resolve(true)
      }
    })
  })
}
