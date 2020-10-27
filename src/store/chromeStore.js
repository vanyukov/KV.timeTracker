import {observable, computed, action} from 'mobx';
import * as chrome from '~/api/chrome'
import StoreClass from "~/store/StoreClass";
import * as dateTime from "~/api/helpers/dateTime";

class chromeStore extends StoreClass{
    @observable isExtensionMode;
    @observable currentTab;
    @observable isJiraTab;
    @observable isUtzTab;

    constructor(rootStore){
        super(rootStore);
        this.isExtensionMode = chrome.isExtensionMode();
        this.currentTab = null;
        this.isJiraTab = false;
        this.isUtzTab = false;

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

                this.isUtzTab = !!(this.currentTab.url.indexOf(
                    this.rootStore.Settings.getSetting('utzUrl')
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
                .catch(e => {
                    console.log(e);
                })

        }

    }

    @action getFieldFromUtz(field){
        if (!this.isExtensionMode){
            return Promise.resolve(field)
        }
        if(!this.isUtzTab){
            return Promise.resolve(null)
        }

        if (field=='date'){
            return  chrome.runJS(this.currentTab, 'document.querySelector("#contentwrapper .heading").innerText.match(/\\d\\d.\\d\\d.\\d\\d\\d\\d/)')

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

        const instance = this;
        function injectTimeLogField(query) {
            return instance.injectField("document.getElementById('log-work-time-logged')", query)
        }

        if (track.ticket != this.getFieldFromJira('ticket')) {
            return Promise.reject('')
        }
        chrome.runJS(this.currentTab, "document.getElementById('log-work').click()");

        //Time
        let trackTime =  track.elapsedTime
        if ( track.active ){
            trackTime += new Date - track.startTime
        }
        if ( track.overtime ){
            trackTime *= 2;
        }
        const elapsedTime = dateTime.timeDiffSplitted(0, 0, trackTime);
        injectTimeLogField("document.getElementById('log-work-time-logged').value = '" + elapsedTime.hours + "h " + elapsedTime.minutes + "m'");

        //Date
        const dateStart = dateTime.parseDate(track.date);
        const time = dateStart.date
            + "/"
            + dateTime.getFormat('MMM', track.date).substr(0, 3)
            + "/"
            + dateTime.getFormat('YY hh:mm', track.date)
            + " " + (dateStart.hour > 11 ? 'PM' : 'AM')
        ;
        injectTimeLogField("document.getElementById('log-work-date-logged-date-picker').value = '" + time + "'");

        //Comment
        setTimeout(function (){
            injectTimeLogField(
                "document.querySelector('iframe').contentWindow.document.querySelector('.mce-content-body').innerHTML = '<p>" + track.comment + "</p>';"
                + "document.querySelector('rich-editor').innerHTML = '<p>" + track.comment + "</p>'; "
                + "document.querySelector('#log-work #comment').value = '" + track.comment + "'; "
            );
        }, 500)
    }

    injectField(checkedField, query){
        const instance = this;
        return chrome.runJS(this.currentTab, checkedField)
            .then(result=>{
                if (result){
                    return chrome.runJS(instance.currentTab, query)
                } else {
                    return new Promise(((resolve, reject)=>{
                        setTimeout(()=>{
                            resolve(instance.injectField(checkedField,query))
                        }, 100)
                    }))
                }
            })

    }

    @action saveUTZ(track){

        const elapsedTime = dateTime.timeDiffSplitted(track.startTime, track.active ? new Date : 0, track.elapsedTime)

        //open popup
        chrome.runJS(this.currentTab, "document.getElementsByTagName('iframe')[0]")
        .then(result=>{
            if (!result){
                chrome.runJS(this.currentTab, "document.querySelector('#addRowLink').click()");
            };
        });

        //set Клиент = mts
        this.injectField(
            "document.getElementsByTagName('iframe')[0].contentWindow.document.querySelector('#ReportRow_customer_id')",
            "document.getElementsByTagName('iframe')[0].contentWindow.document.querySelector('#ReportRow_customer_id').value = 19")
            .then(result=>{
                return chrome.runJS(this.currentTab, "document.getElementsByTagName('iframe')[0].contentWindow.document.querySelector('#ReportRow_customer_id').dispatchEvent(new Event('change'))");
            })
            .then(result=>{

                //Код задачи
                let id = 0;
                if (track.ticket.match(/^IMO-/)){
                    id = 1289
                } else if (track.ticket.match(/^IMD-/)){
                    id = 1268
                } else if (track.ticket.match(/^IMSUPNEW-/)){
                    id = 1258
                };

                if (id){
                    setTimeout(()=>{
                            chrome.runJS(this.currentTab, "document.getElementsByTagName('iframe')[0].contentWindow.document.querySelector('#ReportRow_task_code').value = '" + id + "'")
                            .then(result=>{
                                return chrome.runJS(this.currentTab, "document.getElementsByTagName('iframe')[0].contentWindow.document.querySelector('#ReportRow_task_code').dispatchEvent(new Event(\"change\"))")
                            })
                    },1000)
                }

                // Тикет
                chrome.runJS(this.currentTab, "document.getElementsByTagName('iframe')[0].contentWindow.document.querySelector('#ReportRow_issue').value = '" + track.ticket + "'")

                // Номер эпика
                chrome.runJS(this.currentTab, "document.getElementsByTagName('iframe')[0].contentWindow.document.querySelector('#ReportRow_epic_number').value = '" + track.epic + "'")

                // Время (ч)
                chrome.runJS(this.currentTab, "document.getElementsByTagName('iframe')[0].contentWindow.document.querySelector('#ReportRow_time').value = '" + (+elapsedTime.hours) + (+elapsedTime.minutes ? "." + Math.round(+elapsedTime.minutes * 100 / 60) : "") + "'")

                //Комментарий
                chrome.runJS(this.currentTab, "document.getElementsByTagName('iframe')[0].contentWindow.document.querySelector('#ReportRow_comment').value = '" + track.comment + "'")
                chrome.runJS(this.currentTab, "document.getElementsByTagName('iframe')[0].contentWindow.document.querySelector('#comments').text = '" + track.comment + "'")
                chrome.runJS(this.currentTab, "document.getElementsByTagName('iframe')[0].contentWindow.document.querySelector('.delete_comment').style.cssText = ''")
                chrome.runJS(this.currentTab, "document.getElementsByTagName('iframe')[0].contentWindow.document.querySelector('.editable-input .fancy_textarea').value = '" + track.comment + "'")

                //Внеурочка
                chrome.runJS(this.currentTab, "document.getElementsByTagName('iframe')[0].contentWindow.document.querySelector('#ReportRow_vu').checked = '" + track.overtime + "'")

                setTimeout(()=>{
                    // Тип работ
                    chrome.runJS(this.currentTab, "document.getElementsByTagName('iframe')[0].contentWindow.document.querySelector('#ReportRow_work_type_1').value = 'Разработка проектных решений'")
                }, 1000)

            })

    }

}

export default chromeStore;