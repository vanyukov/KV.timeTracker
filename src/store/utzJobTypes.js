import {observable, computed, action} from 'mobx';
import StoreClass from "./StoreClass";
import utzJobTypes from "~/api/db/utzJobTypes"

export default class UtzJobTypes extends StoreClass {
    @observable items = [];

    constructor(rootStore) {
        super(rootStore);
        this.items = [];
        this.defaultUtzJobTypes = [
            {
                type: 'Разработка проектных решений',
            },
            {
                type: 'Консультация специалистов по задачам, помощь в решении задач',
            },
            {
                type: 'Отладка функционала в рамках этапа тестирования и отладки задач',
            },
            {
                type: 'Решение задач в рамках Поддержки во внеурочное время',
            },
        ]
    }

    @action loadDefault(){
        this.defaultUtzJobTypes.forEach(item=> {
            this.rootStore.dbStore.saveUtzJobType(item);
            this.items.push(item);
        });
    }

    @action newUtzJobType(){
        this.rootStore.dbStore.saveUtzJobType(utzJobTypes.getNew())
            .then(res=>{
                const newItem = utzJobTypes.getNew()
                newItem.key = res;
                this.items.push(newItem);
            })
    }

    @action loadUtzJobTypes() {
        this.rootStore.dbStore.loadUtzJobTypes()
            .then((data)=>{
                if (Array.isArray(data) && data.length) {
                    data.forEach(item=>this.items.push(item));
                } else {
                    this.loadDefault()
                }
            })
    }

    @action changeUtzJobType(key, field, value){
        this.items.find(item=>item.key==key)[field] = value
    }

    @action saveUtzJobType(UtzJobType){
        this.rootStore.dbStore.saveUtzJobType(UtzJobType, UtzJobType.key);
    }

    @action deleteUtzJobType(UtzJobType){
        this.items =this.items.filter(item=>UtzJobType.key!=item.key)
        this.rootStore.dbStore.deleteUtzJobType(UtzJobType.key);
    }
    
}