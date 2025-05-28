import styled from 'styled-components';

import UTabs from 'components/Tabs';

export const Container = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
`;

export const TabContent = styled.div`
  margin-top: 16px;
`;

export const Tabs = styled(UTabs)`
  margin: 0 auto;
`;

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
