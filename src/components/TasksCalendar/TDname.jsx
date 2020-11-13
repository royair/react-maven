import React, { memo } from 'react';
import styled from 'styled-components';
import { Checkbox, Avatar, Image, Tag } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../hooks/useStores';

const TDname = observer(({ employee = {}, ...rest }) => {
  console.log('name');
  const { uiStore } = useStores();

  const onSelect = (e) => {
    employee.setIsSelected(e.target.checked);
  };
  return (
    <TD {...rest}>
      <div className={'container'}>
        {uiStore.filterByEmployee && (
          <Checkbox
            checked={employee.isSelected}
            onChange={onSelect}
          />
        )}
        <Avatar src={<Image src={employee.avatarUrl} />} />

        <span className={'username-container'}>
         <div className={'username'}>{employee.fullName}</div>
         <Tag color={employee.team.color} size={'small'}>{employee.team.name}</Tag>
        </span>
      </div>
    </TD>
  );
});

const TD = styled.td`
  .container {
    display: flex;
    align-items: center;
    white-space: nowrap;

    .ant-avatar {
      margin-left: 10px;
    }

    .username-container {
      margin-left: 10px;
    }

    .team-name {
      font-size: 8px;
    }

    .ant-tag {
      font-size: 10px;
      line-height: 15px;
    }
  }
`;

export default memo(TDname);
