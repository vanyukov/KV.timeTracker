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

    @action setCurrentTrack=(data)=>{
        indexedDB.add(this.db, 'currentTrack', data)
    }

    @action loadCurrentTrack=()=>{
        const rootStore = this.rootStore;
        indexedDB.getAll(this.db, 'currentTrack')
            .then( result=> {
                if (result.length){
                    rootStore.currentTrack.load(result[result.length - 1])
                }
            } );
    }

    @action cleanCurrentTrack=()=>{
        indexedDB.clean(this.db, 'currentTrack')
    }

    @action saveTrack=(data)=>{
        indexedDB.add(this.db, 'tracks', data)
    }

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