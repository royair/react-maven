import { observable, action, computed, makeAutoObservable } from 'mobx';
import { find, filter, random, map, groupBy, forEach } from 'lodash';
import faker from 'faker';
import moment from 'moment';

import { TEAMS } from '../constants/';

export default class EmployeesStore {
  @observable rootStore;
  @observable employees;
  @observable isReady;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.isReady   = false;

    makeAutoObservable(this);
  }

  @action get = () => {
    this.employees = map(MOCK_EMPLOYEES, (employee) => new Employee(employee));
    this.isReady   = true;
  };

  @action setIsSelectedByTeam = ({ teamId, value }) => {
    const team = filter(this.employees, (employee) => employee.team.id === teamId);
    forEach(team, (employee) => employee.setIsSelected(value));
  };

  @action setIsSelectedToAll = (value) => {
    forEach(this.employees, (employee) => employee.setIsSelected(value));
  };

  @computed get filtersState() {
    const state = {
      'sales': {
        id: 'sales',
        name: 'Sales',
        color: 'magenta',
        checked: false,
        indeterminate: false,
        disabled: true
      },
      'marketing': {
        id: 'marketing',
        name: 'Marketing',
        color: 'red',
        checked: false,
        indeterminate: false,
        disabled: true
      },
      'cc': {
        id: 'cc',
        name: 'CC',
        color: 'volcano',
        checked: false,
        indeterminate: false,
        disabled: true
      },
      'product': {
        id: 'product',
        name: 'Product',
        color: 'orange',
        checked: false,
        indeterminate: false,
        disabled: true
      },
      'hr': {
        id: 'hr',
        name: 'HR',
        color: 'gold',
        checked: false,
        indeterminate: false,
        disabled: true
      },
      'r&d': {
        id: 'r&d',
        name: 'R&D',
        color: 'lime',
        checked: false,
        indeterminate: false,
        disabled: true
      },
      'research': {
        id: 'research',
        name: 'Research',
        color: 'green',
        checked: false,
        indeterminate: false,
        disabled: true
      }
    };

    const grouped = groupBy(this.employees, (employee) => employee.team.id);

    forEach(grouped, (value, key) => {
      let allSelected  = true;
      let noneSelected = true;

      forEach(value, (employee) => {
        employee.isSelected
          ? noneSelected = false
          : allSelected = false;
      });

      if (allSelected) state[key].checked = true;
      if (noneSelected) state[key].checked = false;
      if (!allSelected && !noneSelected) state[key].indeterminate = true;

      state[key].disabled = false;
    });

    return state;
  }
}

class Employee {
  @observable id;
  @observable firstName;
  @observable lastName;
  @observable team;
  @observable tasks;
  @observable avatarUrl;
  @observable isSelected;

  constructor(employee) {
    this.id         = employee.id;
    this.firstName  = employee.firstName;
    this.lastName   = employee.lastName;
    this.team       = new Team(employee.team);
    this.tasks      = map(employee.tasks, (task) => new Task(task));
    this.avatarUrl  = employee.avatarUrl;
    this.isSelected = true;

    makeAutoObservable(this);
  }

  @action setIsSelected = (value) => {
    this.isSelected = value;
  };

  @action getTaskByDate = (date) => {

    return find(this.tasks, { date });
  };

  @computed get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Task {
  @observable id;
  @observable title;
  @observable date;
  @observable color;

  constructor(employee) {
    this.id    = employee.id;
    this.title = employee.title;
    this.date  = employee.date;
    this.color = faker.commerce.color();

    makeAutoObservable(this);
  }
}

class Team {
  @observable id;
  @observable name;
  @observable color;

  constructor(name) {
    const found = find(TEAMS, { name });

    this.id    = found.name.toLowerCase();
    this.name  = found.name;
    this.color = found.color;
  }
}

const weekDates = map([...Array(5)], (value, index) => {
  const date      = moment('2020-11-01T00:00:00.000Z')
    .add(index, 'day');
  const isoString = date.toISOString();
  return isoString;

});

const MOCK_EMPLOYEES = [...Array(10)].map((vale, i) => {
  return {
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    team: ['Sales', 'Marketing', 'CC', 'Product', 'HR', 'R&D', 'Research'][random(0, 6)],
    avatarUrl: faker.image.avatar(),
    tasks: generateTasks(),
  };
});

function generateTasks() {
  const numOfTasks = random(0, 5);

  return [...Array(numOfTasks)].map((vale, i) => {
    return {
      id: faker.random.uuid(),
      title: `${faker.hacker.verb()} ${faker.hacker.noun()}`,
      date: weekDates[random(0, 4)]
    };
  });
};
