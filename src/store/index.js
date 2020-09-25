import deviceStore from './device';
import TracksStore from "~/store/tracks";
import Settings from "~/store/settings";
import Comments from "~/store/comments";
import dbStore from "~/store/dbStore"
import chromeStore from "~/store/chromeStore"
import * as IndexedDB from '~/api/IndexedDB'


class RootStore{
    constructor(){
        this.api = {
            IndexedDB
        };

        this.dbStore = new dbStore(this);
        this.chromeStore = new chromeStore(this);
        this.TracksStore = new TracksStore(this);
        this.Settings = new Settings(this);
        this.Comments = new Comments(this);
        this.device     = new deviceStore(this);
    }
}

export default new RootStore();