import {observable, computed, action} from 'mobx';

export default class StoreClass{
    @observable items = []

    constructor(rootStore){
        this.rootStore = rootStore;
    }

    @computed get storeMap(){
        let map = {};

        this.items.forEach((pr, i) => {
            map[pr.id.toString()] = i;
        });

        return map;
    }

    getById(id){
        let index = this.storeMap[id];

        if(index === undefined){
            return null;
        }

        return this.items[index];
    }
}

