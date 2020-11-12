import EmployeesStore from './EmployeesStore';

class RootStore {
  constructor() {
    this.employeesStore = new EmployeesStore(this);
  }
}

export default new RootStore();
