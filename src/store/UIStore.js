import { observable, action, computed, makeAutoObservable } from 'mobx';
import { find, filter, random, map, groupBy, forEach } from 'lodash';

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
