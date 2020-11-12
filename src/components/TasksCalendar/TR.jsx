import React, { memo, useMemo } from 'react';
import { map } from 'lodash';
import { observer } from 'mobx-react';

import EmployeeName from './EmployeeName';

const TR = observer(({ employee, filterByEmployee, weekDates, ...rest }) => {

  const trWeekDatesMemoized = useMemo(() => {
    return map(weekDates, (date) => {
      const key  = `${employee.id}-${date.isoString}`;
      const task = employee.getTaskByDate(date.isoString);

      return employee.isSelected
        ? <td key={key} style={{ backgroundColor: task ? task.color : 'initial' }}>{task ? task.title : '?'}</td>
        : <td key={key}></td>;
    });
  }, [weekDates, employee, employee.isSelected]);

  return (
    <tr key={employee.id} {...rest}>
      <td className={'col-username'}>
        <EmployeeName
          employee={employee}
          showCheckbox={filterByEmployee}
        />
      </td>

      {trWeekDatesMemoized}
    </tr>
  );
});

export default memo(TR);
