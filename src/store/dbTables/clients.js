import { observable, computed, action } from 'mobx';
import StoreClass from '../StoreClass';
import clients from '~/api/db/clients';

export default class Clients extends StoreClass {
  @observable items = [];

  constructor(rootStore) {
    super(rootStore);
    this.table = 'clients';
    this.items = [];
    this.defaultClients = [
      {
        title: 'ОАО «Газпромбанк»',
        id: '5',
        taskCode: '1310',
        taskIdCr: '1310'
      },
      {
        title: 'ПАО «МТС»',
        id: '19',
        taskCode: '',
        taskIdCr: ''
      },
      {
        title: 'ЛЕНВЕНДО',
        id: '4',
        taskCode: '1080',
        taskIdCr: '1080'
      },
      {
        title: 'ООО "Эльдорадо"',
        id: '2',
        taskCode: '1399',
        taskIdCr: '1399'
      },
      {
        title: 'Либерти Страхование (ОАО)',
        id: '18',
        taskCode: '1207',
        taskIdCr: '1207'
      },
      {
        title: 'МЕД-МАГАЗИН',
        id: '35',
        taskCode: '1305',
        taskIdCr: '1305'
      }
    ];
  }

  @action loadDefault() {
    this.defaultClients.forEach(item => {
      this.rootStore.dbStore.saveTableRow(this.table, item);
      this.items.push(item);
    });
  }

  @action newClient() {
    this.rootStore.dbStore
      .saveTableRow(this.table, clients.getNew())
      .then(res => {
        const newItem = clients.getNew();
        newItem.key = res;
        this.items.push(newItem);
      });
  }

  @action loadClients() {
    this.rootStore.dbStore.loadTableRowsWithKeys(this.table).then(data => {
      if (Array.isArray(data) && data.length) {
        data.forEach(item => this.items.push(item));
      } else {
        this.loadDefault();
      }
    });
  }

  @action changeClient(key, field, value) {
    this.items.find(item => item.key == key)[field] = value;
  }

  @action saveClient(Client) {
    this.rootStore.dbStore.saveTableRow(this.table, Client, Client.key);
  }

  @action deleteClient(Client) {
    this.items = this.items.filter(item => Client.key != item.key);
    this.rootStore.dbStore.deleteTableRow(this.table, Client.key);
  }
}
