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

    @action start=(track = tracks.getNew())=>{
        this.items
            .filter(item=>item.active)
            .forEach(track=>{
                this.stop(track.date)
            })
        if(!track.active){
            track = this.items.find(item=>item.date == track.date);
            track.active = true;
            track.startTime = new Date;
        } else {
            this.items.push(track);
        }
        return this.rootStore.dbStore.saveTrack(track);
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

    @action loadTracks=(data)=>{
        this.rootStore.dbStore.loadTracks()
            .then( data=> {
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
            });
    }

    @action update=(track)=>{
        const itemStore = this.items.find(item=>item.date == track.date);
        for ( let key in track){
            itemStore[key] = track[key];
        }
        this.rootStore.dbStore.deleteTrack(itemStore.date);
        this.rootStore.dbStore.saveTrack(track);
    }


}
