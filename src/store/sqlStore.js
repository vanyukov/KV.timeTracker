import {observable, computed, action} from 'mobx';
import * as sql from '~/api/sql'

class sqlStore {
    @observable db;

    constructor(){
        this.db = null;
    }

    @action open=()=>{
        this.db = sql.openDB();
        sql.createTables(this.db);
    }
}

export default new sqlStore();