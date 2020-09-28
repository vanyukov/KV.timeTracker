import {observable, computed, action} from 'mobx';
import StoreClass from "./StoreClass";

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
                value: 'http://timesheet.services.lenvendo.ru'
            },
            {
                name: 'gitRepositoryUrl',
                value: 'https://git.repo.services.lenvendo.ru/mts/mts'
            },
        ]
    }

    @action getSetting(name){

        const setting = this.items.find(item=>item.name==name);
        if (setting){
            return setting.value;
        }

        const defaultSetting = this.defaultSettings.find(item=>item.name==name);
        if(defaultSetting){
            this.rootStore.dbStore.saveSetting(defaultSetting);
            return defaultSetting.value;
        }
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