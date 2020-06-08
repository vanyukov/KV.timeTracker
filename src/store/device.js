import {observable, computed, action} from 'mobx';
import StoreClass from "./StoreClass";

export default class ComplexStore extends StoreClass{

    constructor(rootStore) {
        super(rootStore);
        this.setSize();
    }

    @action setSize() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.widowSize = window.innerWidth < 576 ? "mobile" : window.innerWidth < 991 ? "tablet" : "desktop";
    }

}

