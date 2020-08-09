import {action, observable} from 'mobx';
import StoreClass from "~/store/StoreClass";
import currentTrackFields from "~/api/db/currentTrack";
import tracks from "~/api/db/tracks";

class CurrentTrack extends StoreClass{
    @observable active;
    @observable startTime;
    @observable elapsedTime;

    constructor(rootStore) {
        super(rootStore);
        this.id = null;
        this.active = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.date = null;
        this.ticket = null;
        this.epic = null;
        this.comment = '';
        this.typeUTZ = null;
        this.savedJira = false;
        this.savedUTZ = false;
    }

    @action start=()=>{
        this.active = true;
        this.startTime = new Date;
        this.date = new Date;
        this.ticket = 'get Jira';
        this.epic = 'get Jira';
        this.comment = 'get settings';
        this.typeUTZ = 'get settings';
        this.savedJira = false;
        this.savedUTZ = false;

        const currentTrack = {};
        for (let field in currentTrackFields){
            currentTrack[field] = this[field];
        }

        //Сохранить currentTrack
        this.rootStore.dbStore.setCurrentTrack(currentTrack);
    }

    @action stop=()=>{
        this.active = false;
        this.elapsedTime += new Date - this.startTime;

        //Сохранить в tracks
        const track = {};
        for (let field in tracks){
            track[field] = this[field];
        }
        this.rootStore.dbStore.saveTrack(track);

        //Очистить currentTrack
        this.rootStore.dbStore.cleanCurrentTrack();
    }

    @action load=(data)=>{
        for (let field in currentTrackFields){
            this[field] = data[field];
        }

    }

}

export default CurrentTrack;