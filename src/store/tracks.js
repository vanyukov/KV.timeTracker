import {observable, computed, action} from 'mobx';
import StoreClass from "./StoreClass";
import tracks from "~/api/db/tracks";
import currentTrackFields from "~/api/db/currentTrack";

export default class TracksStore extends StoreClass{
    @observable items;

    constructor(rootStore){
        super(rootStore);
        this.api = this.rootStore.api.tracks;
        this.items = [];
    }

    @action loadTracks(data){
        if (!Array.isArray(data)){
            return null;
        }
        data.forEach(item=>{
            const newLine = {}
            for (let field in tracks){
                newLine[field] = item[field];
            }
            this.items.push( newLine )
        })
    }
}
