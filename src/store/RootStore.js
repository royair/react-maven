import EmployeesStore from './EmployeesStore';
import UIStore from './UIStore';

class RootStore {
  constructor() {
    this.employeesStore = new EmployeesStore(this);
    this.uiStore        = new UIStore(this);
  }
}

export default new RootStore();
