import React, { useEffect, useState, useMemo, memo } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { map } from 'lodash';
import moment from 'moment';
import { Button, Checkbox, Switch } from 'antd';

import TR from './TR';
import { useStores } from '../../hooks/useStores';

const TasksCalendar = observer(() => {
  const { employeesStore }                      = useStores();
  const [filterByEmployee, setFilterByEmployee] = useState(false);
  const startDate                               = moment('2020-11-01T00:00:00.000Z');
  const [weekDates]                             = useState(map([...Array(5)], (value, index) => {
    const date      = moment(startDate)
      .add(index, 'day');
    const formatted = date.format('dddd - DD/MM/YY');
    const isoString = date.toISOString();

    return {
      isoString,
      formatted,
    };
  }));

  const thWeekDaysMemoized = useMemo(() => {
    return weekDates.map((date) => {
      return <th key={date.isoString}>{date.formatted}</th>;
    });
  }, [weekDates]);

  const filterCheckboxesMemoized = useMemo(() => map(employeesStore.filtersState, (filter) => {
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
  }), [employeesStore.filtersState]);

  const employeeTrElem = map(employeesStore.employees, (employee) => {
    return (
      <TR key={employee.id} employee={employee} weekDates={weekDates} filterByEmployee={filterByEmployee} />
    );

  });

  const onChangeFilterByEmployee = (value) => {
    setFilterByEmployee(value);
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
                  checked={filterByEmployee}
                  onChange={onChangeFilterByEmployee}
                  size={'small'} />
                <span style={{ marginLeft: 10 }}>Filter by Employees</span>
              </div>
            </th>
            <th colSpan={6}>
              <div className={'flex justify-between align-center'}>
                <div>
                  {filterCheckboxesMemoized}
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
            {thWeekDaysMemoized}
          </tr>
        </thead>
        <tbody>
          {employeeTrElem}
        </tbody>
      </table>
    </Container>
  );
});

const Container = styled.div`
   margin-top: 200px;
   
  .tasks-table {
    border: 1px solid black;
    
    tr {
      content-visibility: auto;   
    }

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

export default TasksCalendar;
