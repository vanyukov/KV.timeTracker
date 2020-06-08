import {observable, computed, action} from 'mobx';
import StoreClass from "./StoreClass";
import * as sql from '~/api/sql'

export default class TracksStore extends StoreClass{

    constructor(rootStore){
        super(rootStore);
        this.api = this.rootStore.api.tracks;
    }

    @action load(){
        return new Promise((resolve, reject) => {
            // this.items = Object.values(dataExercise.complex);
            resolve(true);
        });
    }
}
