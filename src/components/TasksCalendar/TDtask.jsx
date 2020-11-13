import React, { memo } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

const TDtask = observer(({ task, visible, ...rest }) => {
  const title           = task ? task.title : '?';
  const backgroundColor = () => {
    if (!visible) return 'initial';
    if (task) return task.color;

    return 'initial';
  };

  return (
    <TD backgroundColor={backgroundColor} {...rest}>
      {visible ? title : null}
    </TD>
  );
});

const TD = styled.td`
  background-color: ${({ backgroundColor }) => backgroundColor ? backgroundColor : 'initial'}
`;

export default memo(TDtask);
