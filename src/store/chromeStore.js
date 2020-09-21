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

    @action getFieldFromJira(field){
        if (!this.isExtensionMode){
            return new Promise((resolve, reject)=>resolve(field))
        }
        if(!this.isJiraTab){
            return new Promise((resolve, reject)=>resolve(''))
        }

        if (field == 'ticket'){
            return this.currentTab.url
                    .split('/').pop()
                    .split('?').shift()

        } else if (field == 'title'){
            return  chrome.runJS(this.currentTab, 'document.querySelector("#summary-val").textContent')

        } else if (field == 'branch'){
            return  chrome.runJS(this.currentTab, 'document.querySelector("[title=\'Ticket branch\']").parentElement.querySelector(\'strike\').textContent')

        } else if (field == 'epic'){
            return  chrome.runJS(this.currentTab, 'document.querySelector("[data-fieldtype=\'gh-epic-link\'] a").href.split(\'/\').pop()')

        }

    }

}

export default chromeStore;