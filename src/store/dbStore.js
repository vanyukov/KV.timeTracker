import {observable, computed, action} from 'mobx';
import * as indexedDB from '~/api/IndexedDB'
import StoreClass from "~/store/StoreClass";

class dbStore extends StoreClass{
    @observable db;

    constructor(rootStore){
        super(rootStore);
        this.db = null;
    }

    @action open=()=>{
        return new Promise((resolve, reject)=>{
            indexedDB.openDB()
                .then(result=> {
                    this.db = result;
                    resolve();
                });
        })
    }

    @action saveTrack=(value, key)=>indexedDB.put(this.db, 'tracks', value, key)

    @action deleteTrack=(key)=>indexedDB.del(this.db, 'tracks', key)

    @action loadTracks=()=>{
        const rootStore = this.rootStore;
        indexedDB.getAll(this.db, 'tracks')
            .then( result=> {
                if (result.length){
                    rootStore.TracksStore.loadTracks(result)
                }
            } );
    }

}

export default dbStore;