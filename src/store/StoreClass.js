import { observable, computed, action } from 'mobx'

export default class StoreClass {
  @observable items = []

  constructor(rootStore) {
    this.rootStore = rootStore
    this.items = []
  }

  getById(id) {
    return this.items.find(item => item.id === id)
  }
}
