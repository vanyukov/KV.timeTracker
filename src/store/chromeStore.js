import {observable, computed, action} from 'mobx';
import * as chrome from '~/api/chrome'
import StoreClass from "~/store/StoreClass";

class chromeStore extends StoreClass{
    @observable isExtensionMode;
    @observable currentTab;
    @observable isJiraTab;

    constructor(rootStore){
        super(rootStore);
        this.isExtensionMode = chrome.isExtensionMode();
        this.currentTab = null;
        this.isJiraTab = false;

        if (this.isExtensionMode){
            this.setCurrentTab();
        }
    }

    @action setCurrentTab = ()=>{
        chrome.getCurrentTab()
            .then(result=>this.currentTab = result)
            .then(result=>{

            })
    }

    @computed get jiraTicket(){
        if (this.isExtensionMode){

        }
    }

}

export default chromeStore;