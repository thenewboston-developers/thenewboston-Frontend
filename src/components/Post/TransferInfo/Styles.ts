import {Link as RouterLink} from 'react-router-dom';
import styled from 'styled-components';

import UIcon from 'components/Icon';
import {breakpoints, colors, fonts} from 'styles';

export const Container = styled.div`
  align-items: center;
  background: linear-gradient(
    135deg,
    ${colors.palette.blue[100]} 0%,
    ${colors.palette.green[50]} 50%,
    ${colors.palette.blue[50]} 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow:
    0 2px 12px rgba(47, 92, 129, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.04);
  display: flex;
  margin-top: 12px;
  padding: 14px 16px;
  position: relative;

  @media (max-width: ${breakpoints.mini}) {
    margin-left: 16px;
    margin-right: 16px;
  }

  &::before {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 16px;
    content: '';
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

export const CurrencyLogo = styled.img`
  border-radius: 50%;
  height: 100%;
  width: 100%;
`;

export const Date = styled.div`
  color: ${colors.palette.gray[600]};
  font-size: 12px;
  margin-top: 2px;
`;

export const GraphicWrapper = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);
  display: flex;
  height: 40px;
  justify-content: center;
  margin-right: 14px;
  position: relative;
  width: 40px;
  z-index: 1;
`;

export const Icon = styled(UIcon)`
  & path {
    fill: ${colors.palette.gray[600]} !important;
  }
`;

export const Link = styled(RouterLink)`
  color: ${colors.palette.blue[800]};
  font-weight: ${fonts.weight.semiBold};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: ${colors.palette.blue[600]};
    text-decoration: underline;
    text-shadow: 0 1px 2px rgba(26, 64, 96, 0.1);
  }
`;

export const Text = styled.div`
  color: ${colors.palette.darkGray[400]};
  font-size: 14px;
  letter-spacing: 0.01em;

  strong {
    background: linear-gradient(135deg, ${colors.palette.green[700]} 0%, ${colors.palette.green[600]} 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: ${fonts.weight.bold};
    text-shadow: 0 1px 2px rgba(19, 136, 19, 0.05);
  }
`;
