import { observable, action } from 'mobx';
import StoreClass from '../StoreClass';
import comments from '~/api/db/comments';

export default class Comments extends StoreClass {
  constructor(rootStore) {
    super(rootStore);
    this.table = 'comments';
    this.defaultComments = [
      {
        id: 1,
        text: 'Разработчик. Реализация функциональности',
        idUTZ: '1',
        preview: 'Р.Реализация'
      },
      {
        id: 2,
        text: 'Созвон',
        idUTZ: '1',
        preview: 'Созвон'
      },
      {
        id: 3,
        text: 'Разработчик. Анализ',
        idUTZ: '1',
        preview: 'Р.Анализ'
      },
      {
        id: 4,
        text: 'Разработчик. Внеурочно. Реализация функциональности',
        idUTZ: '1',
        preview: 'Р.Реализация Внеурочно'
      },
      {
        id: 5,
        text: 'Разработчик. Консультации тестировщика',
        idUTZ: '2',
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
