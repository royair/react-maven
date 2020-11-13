import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { map } from 'lodash';
import moment from 'moment';
import { Button, Checkbox, Switch } from 'antd';

import TREmployee from './TRemployee';
import { useStores } from '../../hooks/useStores';

const TableTasksCalendar = observer(() => {
  console.log('AAA');
  const { employeesStore, uiStore } = useStores();
  const [weekDates]                 = useState(map([...Array(5)], (value, index) => {
    const startDate = moment('2020-11-01T00:00:00.000Z');
    const date      = moment(startDate)
      .add(index, 'day');
    const formatted = date.format('dddd - DD/MM/YY');
    const isoString = date.toISOString();

    return {
      isoString,
      formatted,
    };
  }));

  const onChangeFilterByEmployee = (value) => {
    uiStore.setFilterByEmployee(value);
  };

  const onChangeFilterByTeam = (teamId, e) => {
    employeesStore.setIsSelectedByTeam({
      teamId: teamId,
      value: e.target.checked
    });
  };

  const onChangeAllFilters = (value) => {
    employeesStore.setIsSelectedToAll(value);
  };

  useEffect(() => {
    !employeesStore.isReady && employeesStore.get();
  }, [employeesStore, employeesStore.isReady]);

  return (
    <Container>
      <table className={'tasks-table'}>
        <thead>
          <tr>
            <th>
              <div className={'flex align-center'}>
                <Switch
                  checked={uiStore.filterByEmployee}
                  onChange={onChangeFilterByEmployee}
                  size={'small'} />
                <span style={{ marginLeft: 10 }}>Filter by Employees</span>
              </div>
            </th>
            <th colSpan={6}>
              <div className={'flex justify-between align-center'}>
                <div>
                  {map(employeesStore.filtersState, (filter) => {
                    return (
                      <Checkbox
                        key={filter.id}
                        indeterminate={filter.indeterminate}
                        checked={filter.checked}
                        disabled={filter.disabled}
                        onChange={(value) => onChangeFilterByTeam(filter.id, value)}>
                        {filter.name}
                      </Checkbox>
                    );
                  })}
                </div>

                <div>
                  <Button
                    type={'link'}
                    onClick={() => onChangeAllFilters(true)}>
                    all
                  </Button>
                  <span> | </span>
                  <Button
                    type={'link'}
                    onClick={() => onChangeAllFilters(false)}>
                    none
                  </Button>
                </div>
              </div>
            </th>
          </tr>
          <tr>
            <th>Employees</th>
            {map(weekDates, ((date) => {
              return <th key={date.isoString}>{date.formatted}</th>;
            }))}
          </tr>
        </thead>
        <tbody>
          {map(employeesStore.employees, (employee) => {
            return (
              <TREmployee
                key={employee.id}
                employee={employee}
                weekDates={weekDates}
              />
            );
          })}
        </tbody>
      </table>
    </Container>
  );
});

const Container = styled.div`
   margin-top: 200px;
   
  .tasks-table {
    border: 1px solid black;

    th {
      border: 1px solid black;
      padding: 5px 10px;
    }

    td {
      border: 1px solid black;
      padding: 5px 10px;      
    }
  }
`;

export default TableTasksCalendar;
