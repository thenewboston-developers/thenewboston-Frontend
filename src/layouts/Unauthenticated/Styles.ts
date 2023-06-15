import styled from 'styled-components';

import {Input as UInput} from 'components/FormElements';

export const Container = styled.div`
  align-items: center;
  background: #24292f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

export const Heading = styled.h2`
  color: #fff;
  margin-bottom: 12px;
`;

export const Input = styled(UInput)`
  width: 100%;
`;

export const Panel = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 16px;
`;
