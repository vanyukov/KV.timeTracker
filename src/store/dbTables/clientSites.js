import { observable, computed, action } from 'mobx'
import StoreClass from '../StoreClass'
import clientSites from '~/api/db/clientSites'

export default class Clients extends StoreClass {
  @observable items = []

  constructor(rootStore) {
    super(rootStore)
    this.table = 'clientSites'
    this.items = []
    this.defaultClientSites = [
      {
        clientId: 5,
        url: 'redmine.gpbdev.ru',
        title: 'redmine',
      },
      {
        clientId: 5,
        url: 'lv-kv.site.dev.gazprombank.ru',
        title: 'sandbox',
      },
      {
        clientId: 5,
        url: 'gazprombank.ru',
        title: 'Прод',
      },
    ]
  }

  @action loadDefault() {
    this.defaultClientSites.forEach((item) => {
      this.rootStore.dbStore.saveTableRow(this.table, item)
      this.items.push(item)
    })
  }

  @action newClientSite() {
    this.rootStore.dbStore
      .saveTableRow(this.table, clientSites.getNew())
      .then((res) => {
        const newItem = clientSites.getNew()
        newItem.key = res
        this.items.push(newItem)
      })
  }

  @action loadClientSites() {
    this.rootStore.dbStore.loadTableRowsWithKeys(this.table).then((data) => {
      if (Array.isArray(data) && data.length) {
        data.forEach((item) => this.items.push(item))
      } else {
        this.loadDefault()
      }
    })
  }

  @action changeClientSite(key, field, value) {
    this.items.find((item) => item.key == key)[field] = value
  }

  @action saveClientSite(ClientSites) {
    this.rootStore.dbStore.saveTableRow(
      this.table,
      ClientSites,
      ClientSites.key
    )
  }

  @action deleteClientSite(ClientSites) {
    this.items = this.items.filter((item) => ClientSites.key != item.key)
    this.rootStore.dbStore.deleteTableRow(this.table, ClientSites.key)
  }
}
