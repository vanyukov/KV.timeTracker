import { observable, computed, action } from 'mobx'

export default class StoreClass {
  @observable items = []

  constructor(rootStore) {
    this.rootStore = rootStore
    this.items = []
    this.defaultItems = []
  }

  @action loadDefault() {
    this.defaultItems.forEach((item) => {
      const setting = this.getById(item.id)
      if(setting){
        this.rootStore.dbStore.saveTableRow(this.table, item, setting.key)
      } else{
        this.rootStore.dbStore.saveTableRow(this.table, item)
        this.items.push(item)
      }
    })
  }

  getById(id) {
    return this.items.find(item => item.id === id)
  }
}
