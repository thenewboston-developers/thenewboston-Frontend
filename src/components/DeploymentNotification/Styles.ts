import styled, {keyframes} from 'styled-components';

import Icon from 'components/Icon';
import {breakpoints, colors, fonts} from 'styles';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const Button = styled.button`
  background: ${colors.palette.blue[500]};
  border: none;
  border-radius: 8px;
  color: ${colors.white};
  cursor: pointer;
  font-family: ${fonts.family.default};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  min-width: 80px;
  padding: 8px 16px;
  transition: all 0.15s;

  &:hover {
    background: ${colors.palette.blue[600]};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const Container = styled.div`
  animation: ${slideIn} 0.3s ease-out forwards;
  background: ${colors.palette.blue[50]};
  border-bottom: 2px solid ${colors.palette.blue[300]};
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  left: 0;
  padding: 16px 24px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1200px;

  @media (max-width: ${breakpoints.tablet}) {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
`;

export const Countdown = styled.span`
  color: ${colors.palette.blue[700]};
  font-weight: ${fonts.weight.semiBold};
`;

export const DismissButton = styled(Button)`
  background: transparent;
  border: 1px solid ${colors.palette.blue[300]};
  color: ${colors.palette.blue[700]};

  &:hover {
    background: ${colors.palette.blue[100]};
    border-color: ${colors.palette.blue[400]};
    box-shadow: none;
  }
`;

export const InfoIcon = styled(Icon)`
  color: ${colors.palette.blue[500]};
`;

export const Message = styled.div`
  color: ${colors.palette.gray[900]};
  font-size: 16px;
  font-weight: ${fonts.weight.medium};
`;

export const MessageContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
`;
