import { observable, computed, action } from 'mobx'
import StoreClass from '../StoreClass'

export default class Settings extends StoreClass {
  @observable items

  constructor(rootStore) {
    super(rootStore)
    this.table = 'settings'
    this.items = []
    this.defaultSettings = [
      {
        name: 'jiraUrl',
        value: 'https://jira.goods.ru/',
      },
      {
        name: 'utzUrl',
        value: 'http://timesheet.services.lenvendo.ru',
      },
      {
        name: 'gitRepositoryUrl',
        value: 'https://git.shop.mts.ru/shop/backend/site_bitrix',
      },
      {
        name: 'defaultClient',
        value: '23',
      },
      {
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

    const defaultSetting = this.defaultSettings.find(
      (item) => item.name == name
    )
    if (defaultSetting) {
      this.rootStore.dbStore.saveTableRow(this.table, defaultSetting)
      return defaultSetting.value
    }
  }

  @action loadDefault() {
    this.items.length = 0
    this.defaultSettings.forEach((item) => {
      this.rootStore.dbStore.saveTableRow(this.table, item)
      this.items.push(item)
    })
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
