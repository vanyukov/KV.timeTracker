import tracks from "./db/tracks";
import currentTrack from "./db/currentTrack";
import settings from "./db/settings";
import comments from "./db/comments";
import relationJiraUTZ from "./db/relationJiraUTZ";

const dbInfo = {
    name: 'TimeTracks',
    version: 1,
};
const stores = {
    tracks,
    currentTrack,
    settings,
    comments,
    relationJiraUTZ,
}

export function openDB() {
    return new Promise((resolve, reject)=>{
        const dbReq = indexedDB.open(dbInfo.name, dbInfo.version);
        dbReq.onupgradeneeded = (event) => {
            const db = event.target.result;
            for (let store in stores){
                db.createObjectStore(store, {autoIncrement: true});
            }
            resolve(db);
        }
        dbReq.onsuccess = () => {
            resolve(dbReq.result);
        }

    })
}

export function add(db, store, data) {
    return new Promise((resolve, reject)=>{

        const transaction = db.transaction(store, "readwrite");
        const dbStore = transaction.objectStore(store);
        const request = dbStore.add(data);

        request.onsuccess = function() {
            console.log(store + ' add ', request.result);
            resolve(request.result);
        };

        request.onerror = function() {
            console.log("Ошибка", request.error);
            reject(request.error);
        };
    })
}

export function get(db, store, key) {
    return new Promise((resolve, reject)=>{

        const transaction = db.transaction(store, "readonly");
        const dbStore = transaction.objectStore(store);
        const request = dbStore.get(key);

        request.onsuccess = function() {
            if (request.result !== undefined) {
                console.log(store, request.result);
            } else {
                console.log(store + ' - empty');
            }
            resolve(request.result);
        };

        request.onerror = function() {
            console.log("Ошибка", request.error);
            reject(request.error);
        };
    })
}

export function getAll(db, store) {
    return new Promise((resolve, reject)=>{

        const transaction = db.transaction(store, "readonly");
        const dbStore = transaction.objectStore(store);
        const request = dbStore.getAll();

        request.onsuccess = function() {
            if (request.result !== undefined) {
                console.log(store, request.result);
            } else {
                console.log(store + ' - empty');
            }
            resolve(request.result);
        };

        request.onerror = function() {
            console.log("Ошибка", request.error);
            reject(request.error);
        };
    })
}

export function clean(db, store) {
    return new Promise((resolve, reject)=>{

        const transaction = db.transaction(store, "readwrite");
        const dbStore = transaction.objectStore(store);
        const request = dbStore.delete(IDBKeyRange.lowerBound(1, true));

        request.onsuccess = function() {
            resolve(request.result);
        };

        request.onerror = function() {
            console.log("Ошибка", request.error);
            reject(request.error);
        };
    })
}