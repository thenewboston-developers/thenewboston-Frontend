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
  background: ${colors.white};
  border-radius: 16px;
  border-right: 1px solid ${colors.border};
  overflow-y: auto;
  padding: 24px 10px;
`;
