import { observable, computed, action } from 'mobx'
import StoreClass from '../StoreClass'

export default class Settings extends StoreClass {
  constructor(rootStore) {
    super(rootStore)
    this.table = 'settings'
    this.defaultItems = [
      {
        id: 1,
        name: 'jiraUrl',
        value: 'https://jira.goods.ru/',
      },
      {
        id: 2,
        name: 'utzUrl',
        value: 'http://timesheet.services.lenvendo.ru',
      },
      {
        id: 3,
        name: 'gitRepositoryUrl',
        value: 'https://git.shop.mts.ru/shop/backend/site_bitrix',
      },
      {
        id: 4,
        name: 'defaultClient',
        value: '23',
      },
      {
        id: 5,
        name: 'defaultComment',
        value: 1,
      },
    ]
  }

  @action getSetting(name) {
    const setting = this.items.find((item) => item.name == name)
    if (setting) {
      return setting.value
    }

    const defaultItems = this.defaultItems.find(
      (item) => item.name == name
    )
    if (defaultItems) {
      this.rootStore.dbStore.saveTableRow(this.table, defaultItems)
      return defaultItems.value
    }
  }

  @action loadSettings() {
    this.items = []
    this.rootStore.dbStore.loadTableRows(this.table).then((data) => {
      if (!Array.isArray(data)) {
        return null
      }
      data.forEach((item) => this.items.push(item))
    })
  }

  @action changeSetting(name, value) {
    this.items.find((item) => item.name == name).value = value
  }
}
