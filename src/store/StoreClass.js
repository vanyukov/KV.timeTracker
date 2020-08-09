import {observable, computed, action} from 'mobx';

export default class StoreClass{
    constructor(rootStore){
        this.rootStore = rootStore;
    }
}

