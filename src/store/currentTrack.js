import {action, observable} from 'mobx';

class CurrentTrack {
    @observable id;
    @observable active;
    @observable startTime;
    @observable elapsedTime;

    constructor() {
        this.id = null;
        this.active = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.date = new Date;
        this.ticket = null;
        this.epic = null;
        this.comment = '';
        this.typeUTZ = null;
        this.savedJira = false;
        this.savedUTZ = false;
    }

    @action start=()=>{
        this.active = true;
        this.startTime = new Date;
    }

    @action stop=()=>{
        this.active = false;
        this.elapsedTime += new Date - this.startTime;
    }

}

export default new CurrentTrack();