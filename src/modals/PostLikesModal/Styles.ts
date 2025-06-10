import styled from 'styled-components';

import UModal from 'components/Modal';
import {breakpoints, colors} from 'styles';

export const EmptyMessage = styled.div`
  color: ${colors.palette.gray[600]};
  font-size: 16px;
  padding: 24px 12px;
  text-align: center;
`;

export const EndMessageContainer = styled.div`
  margin-top: 16px;
`;

export const LikeItem = styled.div`
  padding: 8px 12px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.palette.gray[50]};
  }
`;

export const LikesList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 40px 12px;
`;

export const LoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  max-height: 600px;
  width: 480px;

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 90vw;
    width: 100%;
  }
`;

export const ScrollContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;
