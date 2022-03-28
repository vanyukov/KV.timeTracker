import { observable, computed, action } from 'mobx'
import StoreClass from '../StoreClass'
import utzJobTypes from '~/api/db/utzJobTypes'

export default class UtzJobTypes extends StoreClass {
  @observable items = []

  constructor(rootStore) {
    super(rootStore)
    this.table = 'utzJobTypes'
    this.items = []
    this.defaultUtzJobTypes = [
      {
        id: 1,
        type: 'Разработка проектных решений',
      },
      {
        id: 2,
        type: 'Консультация специалистов по задачам, помощь в решении задач',
      },
      {
        id: 3,
        type: 'Отладка функционала в рамках этапа тестирования и отладки задач',
      },
      {
        id: 4,
        type: 'Решение задач в рамках Поддержки во внеурочное время',
      },
    ]
  }

  getById(id) {
    console.log("🚀 -> file: utzJobTypes.js -> line 33 -> getById -> id", id)
    console.log("🚀 -> file: utzJobTypes.js -> line 35 -> getById -> this.items", this.items)
    return this.items.find(item => item.id === id)
  }

  @action loadDefault() {
    this.defaultUtzJobTypes.forEach((item) => {
      this.rootStore.dbStore.saveTableRow(this.table, item)
      this.items.push(item)
    })
  }

  @action newUtzJobType() {
    this.rootStore.dbStore
      .saveTableRow(this.table, utzJobTypes.getNew())
      .then((res) => {
        const newItem = utzJobTypes.getNew()
        newItem.key = res
        this.items.push(newItem)
      })
  }

  @action loadUtzJobTypes() {
    this.rootStore.dbStore.loadTableRowsWithKeys(this.table).then((data) => {
      if (Array.isArray(data) && data.length) {
        data.forEach((item) => this.items.push(item))
      } else {
        this.loadDefault()
      }
    })
  }

  @action changeUtzJobType(key, field, value) {
    this.items.find((item) => item.key == key)[field] = value
  }

  @action saveUtzJobType(UtzJobType) {
    this.rootStore.dbStore.saveTableRow(this.table, UtzJobType, UtzJobType.key)
  }

  @action deleteUtzJobType(UtzJobType) {
    this.items = this.items.filter((item) => UtzJobType.key != item.key)
    this.rootStore.dbStore.deleteTableRow(this.table, UtzJobType.key)
  }
}
