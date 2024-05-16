import styled from 'styled-components';
import Icon from '@mdi/react';

import UUserLabel from 'components/UserLabel';
import {colors, fonts} from 'styles';

export const Container = styled.div`
  background: ${colors.white};
  border-radius: 16px;
`;

export const Content = styled.div`
  font-size: 15px;
  padding: 16px 20px;
`;

export const Description = styled.p`
  color: ${colors.gray};
  font-size: 14px;
  font-weight: ${fonts.weight.regular};
  margin-top: 5px;
`;

export const Divider = styled.div`
  background: ${colors.border};
  height: 1px;
  margin: 10px 0;
`;

export const Footer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const FooterItem = styled.div`
  align-items: center;
  color: ${colors.palette.gray[500]};
  display: flex;
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  justify-content: space-between;
`;

export const StyledIcon = styled(Icon)`
  height: 20px;
  margin-right: 6px;
  width: 20px;
`;

export const Name = styled.h3`
  font-weight: ${fonts.weight.semiBold};
`;

export const UserLabel = styled(UUserLabel)``;
