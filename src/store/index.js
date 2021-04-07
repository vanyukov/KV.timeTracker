import deviceStore from './device';
import dbStore from '~/store/dbStore';
import chromeStore from '~/store/chromeStore';
import * as IndexedDB from '~/api/IndexedDB';

import TracksStore from '~/store/dbTables/tracks';
import Settings from '~/store/dbTables/settings';
import Comments from '~/store/dbTables/comments';
import Clients from '~/store/dbTables/clients';
import UtzJobTypes from '~/store/dbTables/utzJobTypes';

class RootStore {
  constructor() {
    this.api = {
      IndexedDB
    };

    this.device = new deviceStore(this);
    this.dbStore = new dbStore(this);
    this.chromeStore = new chromeStore(this);
    this.TracksStore = new TracksStore(this);
    this.Settings = new Settings(this);
    this.Comments = new Comments(this);
    this.Clients = new Clients(this);
    this.UtzJobTypes = new UtzJobTypes(this);
  }
}

export default new RootStore();
