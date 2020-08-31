import {observable, computed, action} from 'mobx';
import StoreClass from "./StoreClass";
import settings from "~/api/db/settings";

export default class Settings extends StoreClass {
    @observable items;

    constructor(rootStore) {
        super(rootStore);
        this.items = [];
    }

    @action initSettings(){
        const setting = settings.getNew();
        setting.name = 'jiraUrl';
        setting.value = 'http://jira.mts.quantumart.ru';
        this.rootStore.dbStore.saveSetting(setting);
    }

    @action loadSettings() {
        this.items = [];
        this.rootStore.dbStore.loadSettings()
            .then((data)=>{
                if (!Array.isArray(data)) {
                    return null;
                }
                if (!data.length){
                    this.initSettings();
                }
                data.forEach(item => {
                    const newLine = {}
                    const track = settings.getNew();
                    for (let field in track) {
                        newLine[field] = item[field];
                    }
                    this.items.push(newLine)
                })
            })
    }

    @action changeSetting(name, value){
        this.items.find(item=>item.name==name).value = value
    }


}