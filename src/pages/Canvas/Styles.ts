import styled from 'styled-components';

import {Input as UInput} from 'components/FormElements';
import {colors} from 'styles';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 1fr;
  height: 100vh;
`;

export const Input = styled(UInput)`
  width: 100%;
`;

export const Left = styled.div`
  border-right: 1px solid ${colors.border};
  overflow-y: auto;
  padding: 24px 16px;
`;

export const Right = styled.div`
  overflow-y: auto;
  padding: 24px 16px;
`;
