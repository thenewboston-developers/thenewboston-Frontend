import styled from 'styled-components';

import {Textarea as UTextarea} from 'components/FormElements';
import UModal from 'components/Modal';
import {colors} from 'styles';

export const Arrow = styled.div`
  font-size: 24px;
  text-align: center;
  color: ${colors.palette.gray['500']};
  margin: 8px 0;
`;

export const Bumper = styled.div`
  margin-bottom: 24px;
`;

export const Div = styled.div`
  position: relative;
`;

export const Label = styled.span`
  color: ${colors.palette.gray['600']};
  font-size: 12px;
  font-weight: 600;
  margin-right: 12px;
  min-width: 40px;
`;

export const Modal = styled(UModal)`
  width: 420px;
`;

export const NoWalletsMessage = styled.div`
  color: ${colors.palette.gray['600']};
  margin-bottom: 24px;
  text-align: center;
`;

export const Textarea = styled(UTextarea)`
  padding-right: 43px;
  max-height: 350px;
  overflow-y: auto;
`;

export const TransferInfo = styled.div`
  background-color: ${colors.palette.gray['100']};
  border: 1px solid ${colors.palette.gray['200']};
  border-radius: 8px;
  margin-bottom: 24px;
  padding: 16px;
`;

export const UserRow = styled.div`
  align-items: center;
  display: flex;
`;
