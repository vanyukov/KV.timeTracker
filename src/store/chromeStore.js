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
                this.isJiraTab = !!(this.currentTab.url.indexOf(
                    this.rootStore.Settings.getSetting('jiraUrl')
                ) + 1)

            })
    }

    @action getJiraTicket(){
        if (this.isExtensionMode
            && this.isJiraTab
        ){
            return this.currentTab.url
                .split('/').pop()
                .split('?').shift()
        }

        return ''
    }

    @action getJiraTicketTitle(){
        if (this.isExtensionMode
            && this.isJiraTab
        ){
            return  chrome.runJS(this.currentTab, 'document.querySelector("#summary-val").textContent')
        }

        return new Promise((resolve, reject)=>resolve(null))
    }

    @action getJiraBranch(){
        if (this.isExtensionMode
            && this.isJiraTab
        ){
            return  chrome.runJS(this.currentTab, 'document.querySelector("[title=\'Ticket branch\']").parentElement.querySelector(\'strike\').textContent')
        }

        return new Promise((resolve, reject)=>resolve(null))
    }

}

export default chromeStore;