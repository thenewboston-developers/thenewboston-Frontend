import styled from 'styled-components';

import UButton from 'components/Button';
import {colors} from 'styles';

export const Button = styled(UButton)`
  width: 100%;
`;

export const ButtonContainer = styled.div`
  padding: 0 16px 16px;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100vh;
`;

export const LeftMenu = styled.div`
  border-right: 1px solid ${colors.border};
  overflow-y: auto;
  padding: 24px 0;
`;

export const Right = styled.div`
  padding: 24px 16px;
`;
