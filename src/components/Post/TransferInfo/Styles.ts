import {Link as RouterLink} from 'react-router-dom';
import styled from 'styled-components';

import UIcon from 'components/Icon';
import {colors, fonts} from 'styles';

export const Container = styled.div`
  align-items: center;
  background: ${colors.palette.gray[100]};
  border: 1px solid ${colors.palette.gray[200]};
  border-radius: 12px;
  display: flex;
  margin-top: 12px;
  padding: 12px 14px;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const CurrencyLogo = styled.img`
  border-radius: 50%;
  height: 100%;
  width: 100%;
`;

export const Date = styled.div`
  color: ${colors.gray};
  font-size: 12px;
  margin-top: 2px;
`;

export const GraphicWrapper = styled.div`
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  height: 42px;
  justify-content: center;
  margin-right: 12px;
  width: 42px;
`;

export const Icon = styled(UIcon)`
  & path {
    fill: ${colors.palette.gray[600]} !important;
  }
`;

export const Link = styled(RouterLink)`
  color: ${colors.palette.gray[900]};
  font-weight: ${fonts.weight.semiBold};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Text = styled.div`
  color: ${colors.palette.gray[700]};
  font-size: 14px;

  strong {
    color: ${colors.palette.gray[900]};
    font-weight: ${fonts.weight.semiBold};
  }
`;
