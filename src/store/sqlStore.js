import {observable, computed, action} from 'mobx';
import StoreClass from "./StoreClass";
import * as sql from '~/api/sql'

export default class ComplexStore extends StoreClass{

    constructor(rootStore){
        super(rootStore);
        this.db = null;
    }

    @action open=()=>{
        this.bd = sql.openDB();
    }
}

