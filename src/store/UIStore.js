import { observable, action, makeAutoObservable } from 'mobx';

export default class UIStore {
  @observable rootStore;
  @observable filterByEmployee = false;

  constructor(rootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }

  @action setFilterByEmployee = (value) => {
    this.filterByEmployee = value;
  };
}
