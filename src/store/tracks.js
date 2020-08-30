import {observable, computed, action} from 'mobx';
import StoreClass from "./StoreClass";
import tracks from "~/api/db/tracks";

export default class TracksStore extends StoreClass{
    @observable items;

    constructor(rootStore){
        super(rootStore);
        this.api = this.rootStore.api.tracks;
        this.items = [];
    }

    @action start=()=>{
        const track = tracks.getNew();
        this.items.push(track);
        this.rootStore.dbStore.saveTrack(track);
    }

    @action stop=(date)=>{
        this.items
            .filter(item=>item.date == date)
            .map(track=>{
                track.active = false;
                track.elapsedTime += new Date - track.startTime;
                this.rootStore.dbStore.deleteTrack(date);
                this.rootStore.dbStore.saveTrack(track);
            })
    }

    @action delete=(date)=> {
        this.items = this.items.filter(item=>item.date != date);
        this.rootStore.dbStore.deleteTrack(date);
    }

    @action loadTracks(data){
        if (!Array.isArray(data)){
            return null;
        }
        data.forEach(item=>{
            const newLine = {}
            const track = tracks.getNew();
            for (let field in track){
                newLine[field] = item[field];
            }
            this.items.push( newLine )
        })
    }
}
