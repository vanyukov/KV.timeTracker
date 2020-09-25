import {observable, computed, action} from 'mobx';
import StoreClass from "./StoreClass";
import comments from "~/api/db/comments"

export default class Comments extends StoreClass {
    @observable items = [];

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

    @action loadDefault(){
        this.defaultComments.forEach(item=> {
            this.rootStore.dbStore.saveComment(item);
            this.items.push(item);
        });
    }

    @action newComment(){
        this.items.push(comments.getNew());
    }

    @action loadComments() {
        this.rootStore.dbStore.loadComments()
            .then((data)=>{
                if (Array.isArray(data) && data.length) {
                    data.forEach(item=>this.items.push(item));
                } else {
                    this.loadDefault()
                }
            })
    }

    @action changeComment(key, field, value){
        this.items.find(item=>item.key==key)[field] = value
    }

    @action saveComment(comment){
        this.rootStore.dbStore.saveComment(comment, comment.key);
    }

    @action deleteComment(comment){
        this.items =this.items.filter(item=>comment.key!=item.key)
        this.rootStore.dbStore.deleteComment(comment.key);
    }


}