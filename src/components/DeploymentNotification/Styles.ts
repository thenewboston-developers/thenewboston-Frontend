import styled, {keyframes} from 'styled-components';

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
  border-radius: 4px;
  color: ${colors.white};
  cursor: pointer;
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  padding: 8px 16px;
  transition: background 0.2s;

  &:hover {
    background: ${colors.palette.blue[600]};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const Container = styled.div`
  animation: ${slideIn} 0.3s ease-out;
  background: ${colors.palette.blue[50]};
  border-bottom: 2px solid ${colors.palette.blue[200]};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  left: 0;
  padding: 16px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9999;
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
  font-weight: ${fonts.weight.bold};
`;

export const DismissButton = styled(Button)`
  background: transparent;
  border: 1px solid ${colors.palette.blue[300]};
  color: ${colors.palette.blue[700]};

  &:hover {
    background: ${colors.palette.blue[100]};
  }
`;

export const Message = styled.div`
  color: ${colors.palette.gray[900]};
  font-size: 16px;
  font-weight: ${fonts.weight.medium};
`;
