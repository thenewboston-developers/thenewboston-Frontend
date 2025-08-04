import styled from 'styled-components';

import UModal from 'components/Modal';
import {colors} from 'styles';

export const Message = styled.p`
  color: ${colors.palette.gray[700]};
  line-height: 1.6;
  margin: 0;
`;

export const Modal = styled(UModal)`
  width: 400px;
`;
