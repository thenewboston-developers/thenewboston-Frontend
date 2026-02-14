import styled from 'styled-components';

import {Input as UInput, Select as USelect, Textarea as UTextarea} from 'components/FormElements';
import UModal, {ModalBody as UModalBody, ModalFooter as UModalFooter} from 'components/Modal';
import {breakpoints, colors} from 'styles';

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

export const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px;
`;

export const LoadingText = styled.div`
  color: ${colors.palette.gray[600]};
  font-size: 14px;
`;

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 24px);
  width: min(420px, calc(100vw - 24px));

  @supports (height: 1dvh) {
    max-height: calc(100dvh - 24px);
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: calc(100vw - 16px);
  }

  > div:last-child {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
  }

  > div:last-child > form {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
  }
`;

export const ModalBody = styled(UModalBody)`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

export const ModalFooter = styled(UModalFooter)`
  background: ${colors.white};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top: 1px solid ${colors.palette.gray[100]};
  flex-shrink: 0;
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
