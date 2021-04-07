import { observable, action } from "mobx";
import * as indexedDB from "~/api/IndexedDB";
import StoreClass from "~/store/StoreClass";

class dbStore extends StoreClass {
  @observable db;

  constructor(rootStore) {
    super(rootStore);
    this.db = null;
  }

  @action open = () => {
    return new Promise((resolve, reject) => {
      indexedDB.openDB().then(result => {
        this.db = result;
        resolve();
      });
    });
  };

  @action saveTableRow = (table, value, key) =>
    indexedDB.put(this.db, table, value, key);

  @action deleteTableRow = (table, key) => indexedDB.del(this.db, table, key);

  @action loadTableRows = table => indexedDB.getAll(this.db, table);

  @action getTableRow = (table, key) => indexedDB.get(this.db, table, key);

  @action exportToJsonString = () => indexedDB.exportToJsonString(this.db);

  @action clearDatabase = () => indexedDB.clearDatabase(this.db);

  @action importFromJsonString = jsonString =>
    indexedDB.importFromJsonString(this.db, jsonString);
}

export default dbStore;
