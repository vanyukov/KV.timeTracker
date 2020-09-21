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
            return Promise.resolve(field)
        }
        if(!this.isJiraTab){
            return Promise.resolve(null)
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
                .then(result=>{
                    if (result) {
                        return Promise.resolve(result)
                    }

                    return this.getEpicLinkId()
                        .then(epicLinkId => {
                            return this.getEpicLink(epicLinkId, this.getFieldFromJira('ticket'));
                        })
                })

        }

    }

    getEpicLinkId(){
        return fetch(this.rootStore.Settings.getSetting('jiraUrl') + `/rest/api/2/field`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
        .then(data => data.json())
        .then(data => {
            var epicLink = data.find(item => item.name === 'Epic Link');

            if(epicLink.id){
                return Promise.resolve(epicLink.id);
            }
            return Promise.reject()
        })
    }

    getEpicLink(epicLinkId, ticket){
        return fetch(this.rootStore.Settings.getSetting('jiraUrl') + `/rest/api/latest/issue/${ticket}?fields=issuetype,parent,${epicLinkId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
        .then(data => data.json())
        .then(data => {
            //Если есть эпик линк - отдадим его
            if(data.fields[epicLinkId]){
                return Promise.resolve(data.fields[epicLinkId]);
                //Если issue = эпик, отдадим его же ключ
            }else if(data.fields.issuetype.name === 'Epic'){
                return Promise.resolve(data.key);
                //Если есть родитель, то пытаемся найти его.
            }else if(data.fields.parent){
                return this.getEpicLink(epicLinkId, data.fields.parent.key);
            }else {
                return Promise.reject();
            }
        });
    }

    @action saveJira(track){
        if (track.ticket != this.getFieldFromJira('ticket')) {
            return Promise.reject('')
        }
        chrome.runJS(this.currentTab, 'document.getElementById(\'opsbar-operations_more\').dispatchEvent(new Event(\'click\'))')

    }

}

export default chromeStore;