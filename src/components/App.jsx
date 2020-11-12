import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { TasksCalendar } from './index';

const App = observer(() => {
  return (
    <Container>
      <TasksCalendar />
    </Container>
  );
});

const Container = styled.div`
  display: flex;  
  justify-content: center;  
  width: 100%;
  height: 100%;
`;

export default App;
