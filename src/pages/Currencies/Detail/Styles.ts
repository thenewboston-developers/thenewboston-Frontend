import styled from 'styled-components';

import UModal from 'components/Modal';
import {colors, fonts, pagePadding, toolbarStyle} from 'styles';

export const BackButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  color: ${colors.secondary};
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  gap: 8px;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: ${colors.primary};
  }

  span {
    font-family: ${fonts.family.default};
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const Content = styled.div`
  ${pagePadding};
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

export const Header = styled.div`
  ${toolbarStyle};
`;

export const TabSection = styled.div`
  margin-top: 32px;
`;

export const TabHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const LoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
`;

export const TabContent = styled.div`
  margin-top: 24px;
`;

export const ConfirmationModal = styled(UModal)`
  width: 400px;
`;

export const ConfirmationText = styled.p`
  color: ${colors.palette.gray[700]};
  line-height: 1.6;
  margin-bottom: 24px;
`;

export const ConfirmationButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;
