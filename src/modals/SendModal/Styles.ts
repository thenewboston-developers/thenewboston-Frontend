import styled from 'styled-components';

import {Input as UInput, Select as USelect, Textarea as UTextarea} from 'components/FormElements';
import UModal from 'components/Modal';
import {colors} from 'styles';

export const Arrow = styled.div`
  color: ${colors.palette.gray[500]};
  font-size: 24px;
  margin: 8px 0;
  text-align: center;
`;

export const Input = styled(UInput)``;

export const Label = styled.span`
  font-size: 12px;
  margin-right: 8px;
  min-width: 40px;
`;

export const Modal = styled(UModal)`
  width: 420px;
`;

export const NoWalletsMessage = styled.div`
  color: ${colors.palette.gray[600]};
  margin-bottom: 24px;
  text-align: center;
`;

export const Select = styled(USelect)``;

export const Textarea = styled(UTextarea)`
  max-height: 350px;
  overflow-y: auto;
  padding-right: 43px;
`;

export const TextareaContainer = styled.div`
  position: relative;
`;

export const TransferInfo = styled.div`
  background-color: ${colors.palette.gray[100]};
  border: 1px solid ${colors.palette.gray[200]};
  border-radius: 8px;
  margin-bottom: 24px;
  padding: 16px;
`;

export const UserRow = styled.div`
  align-items: center;
  display: flex;
`;
