import styled from 'styled-components';
import UModal from 'components/Modal';

export const Bumper = styled.div`
  margin-bottom: 24px;
`;

export const Modal = styled(UModal)`
  width: 250px;
  height: 250px;
`;

export const Div = styled.div`
  overflow-y: auto;
  max-height: 150px;
`;

export const Row = styled.div<{$isFirst: boolean | false}>`
  padding: 6px 0px;
  border-top: ${({$isFirst}) => ($isFirst ? '' : '1px solid darkgrey')};
`;
