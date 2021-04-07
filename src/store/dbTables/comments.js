import { observable, action } from 'mobx';
import StoreClass from '../StoreClass';
import comments from '~/api/db/comments';

export default class Comments extends StoreClass {
  @observable items = [];

  constructor(rootStore) {
    super(rootStore);
    this.table = 'comments';
    this.items = [];
    this.defaultComments = [
      {
        text: 'Разработчик. Реализация функциональности',
        idUTZ: '',
        preview: 'Р.Реализация'
      },
      {
        text: 'Разработчик. Анализ',
        idUTZ: '',
        preview: 'Р.Анализ'
      },
      {
        text: 'Разработчик. Внеурочно. Реализация функциональности',
        idUTZ: '',
        preview: 'Р.Реализация Внеурочно'
      },
      {
        text: 'Разработчик. Консультации тестировщика',
        idUTZ: '',
        preview: 'Р.Консультации тестировщика'
      }
    ];
  }

  @action loadDefault() {
    this.defaultComments.forEach(item => {
      this.rootStore.dbStore.saveTableRow(this.table, item);
      this.items.push(item);
    });
  }

  @action newComment() {
    this.rootStore.dbStore
      .saveTableRow(this.table, comments.getNew())
      .then(res => {
        const newItem = comments.getNew();
        newItem.key = res;
        this.items.push(newItem);
      });
  }

  @action loadComments() {
    this.rootStore.dbStore.loadTableRowsWithKeys(this.table).then(data => {
      if (Array.isArray(data) && data.length) {
        data.forEach(item => this.items.push(item));
      } else {
        this.loadDefault();
      }
    });
  }

  @action changeComment(key, field, value) {
    this.items.find(item => item.key == key)[field] = value;
  }

  @action saveComment(comment) {
    this.rootStore.dbStore.saveTableRow(this.table, comment, comment.key);
  }

  @action deleteComment(comment) {
    this.items = this.items.filter(item => comment.key != item.key);
    this.rootStore.dbStore.deleteTableRow(this.table, comment.key);
  }
}
