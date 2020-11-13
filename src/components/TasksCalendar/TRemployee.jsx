import React, { memo } from 'react';
import { map } from 'lodash';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import TDname from './TDname';
import TDtask from './TDtask';

const TRemployee = observer(({ employee, weekDates, ...rest }) => {

  return (
    <TR {...rest}>
      <TDname employee={employee} />

      {map(weekDates, (date) => {
        const key  = `${employee.id}-${date.isoString}`;
        const task = employee.getTaskByDate(date.isoString);

        return (
          <TDtask
            key={key}
            task={task}
            visible={employee.isSelected}
          />
        );
      })}
    </TR>
  );
});

const TR = styled.tr`
`;


export default memo(TRemployee);
