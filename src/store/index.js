import { configure } from 'mobx';
import deviceStore from './device';
import CurrentTrack from "~/store/currentTrack";
import TracksStore from "~/store/tracks";
import * as sql from '~/api/sql'


class RootStore{
    constructor(){
        this.api = {
            sql
        };

        this.currentTrack = CurrentTrack;
        this.TracksStore = TracksStore;
        this.storage    = localStorage;
        this.device     = new deviceStore(this);
    }
}

export default new RootStore();