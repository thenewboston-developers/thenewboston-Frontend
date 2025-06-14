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
  padding: 16px;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Date = styled.div`
  color: ${colors.palette.gray[500]};
  font-size: 13px;
  margin-top: 4px;
`;

export const Icon = styled(UIcon)`
  & path {
    fill: ${colors.palette.gray[600]} !important;
  }
`;

export const IconWrapper = styled.div`
  align-items: center;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  height: 48px;
  justify-content: center;
  margin-right: 16px;
  width: 48px;
`;

export const Link = styled(RouterLink)`
  color: ${colors.palette.gray[900]};
  font-weight: ${fonts.weight.bold};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Text = styled.div`
  color: ${colors.palette.gray[700]};
  font-size: 15px;
  line-height: 1.4;

  strong {
    color: ${colors.palette.gray[900]};
    font-weight: ${fonts.weight.bold};
  }
`;
