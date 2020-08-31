import {observable, computed, action} from 'mobx';
import StoreClass from "./StoreClass";
import settings from "~/api/db/settings";

export default class Settings extends StoreClass {
    @observable items;

    constructor(rootStore) {
        super(rootStore);
        this.items = [];
        this.defaultSettings = [
            {
                name: 'jiraUrl',
                value: 'http://jira.mts.quantumart.ru'
            },
            {
                name: 'utzUrl',
                value: 'http://timesheet.services.lenvendo.ru/report/my/list'
            },
        ]
    }

    @action getSetting(name){
        this.rootStore.dbStore.get(name)
            .then((result)=>{
                if(!result){
                    const defaultSetting = this.defaultSettings.find(item=>item.name==name);
                    if(defaultSetting){
                        this.rootStore.dbStore.saveSetting(defaultSetting);
                        this.items.push(defaultSetting);
                    }
                }
            })
    }

    @action initSetting(name){
        this.defaultSettings.find(item=> {
            this.rootStore.dbStore.saveSetting(item);
            this.items.push(item);
        });
    }

    @action loadDefault(){
        this.items.length = 0;
        this.defaultSettings.forEach(item=> {
            this.rootStore.dbStore.saveSetting(item);
            this.items.push(item);
        });
    }

    @action loadSettings() {
        this.items = [];
        this.rootStore.dbStore.loadSettings()
            .then((data)=>{
                if (!Array.isArray(data)) {
                    return null;
                }
                data.forEach(item=>this.items.push(item));
            })
    }

    @action changeSetting(name, value){
        this.items.find(item=>item.name==name).value = value
    }


}