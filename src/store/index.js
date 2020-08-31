import { configure } from 'mobx';
import deviceStore from './device';
import TracksStore from "~/store/tracks";
import Settings from "~/store/settings";
import dbStore from "~/store/dbStore"
import * as IndexedDB from '~/api/IndexedDB'


class RootStore{
    constructor(){
        this.api = {
            IndexedDB
        };

        this.dbStore = new dbStore(this);
        this.TracksStore = new TracksStore(this);
        this.Settings = new Settings(this);
        this.device     = new deviceStore(this);
    }
}

export default new RootStore();