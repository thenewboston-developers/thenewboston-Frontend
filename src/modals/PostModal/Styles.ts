import styled from 'styled-components';
import {Textarea} from 'components/FormElements';
import UModal from 'components/Modal';

export const Bumper = styled.div`
  margin-bottom: 24px;
`;

export const Modal = styled(UModal)`
  width: 360px;
`;
export const InputBox = styled(Textarea)`
  padding-right: 43px;
  max-height: 350px;
  overflow-y: auto;
`;

export const Div = styled.div`
  position: relative;
`;
