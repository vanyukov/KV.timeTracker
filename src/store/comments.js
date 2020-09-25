import {observable, computed, action} from 'mobx';
import StoreClass from "./StoreClass";

export default class Comments extends StoreClass {
    @observable items;

    constructor(rootStore) {
        super(rootStore);
        this.items = [];
        this.defaultComments = [
            {
                text: 'Разработчик. Реализация функциональности',
                idUTZ: '',
                preview: 'Р.Реализация',
            },
            {
                text: 'Разработчик. Консультации тестировщика',
                idUTZ: '',
                preview: 'Р.Консультации тестировщика',
            },
            {
                text: 'Разработчик. Исправление ошибки',
                idUTZ: '',
                preview: 'Р.Исправление ошибки',
            },
        ]
    }

    @action getComment(name){

    }

    @action loadDefault(name){

    }

    @action changeComment(name, value){
        this.items.find(item=>item.name==name).value = value
    }


}