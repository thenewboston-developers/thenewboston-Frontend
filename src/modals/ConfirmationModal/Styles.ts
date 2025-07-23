import styled from 'styled-components';

import UModal from 'components/Modal';
import {colors} from 'styles';

export const Buttons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

export const Content = styled.p`
  color: ${colors.palette.gray[700]};
  line-height: 1.6;
  margin-bottom: 24px;
`;

export const Modal = styled(UModal)`
  width: 400px;
`;
