import styled from 'styled-components';

import {colors, fonts} from 'styles';
import UUserLabel from 'components/UserLabel';
import Icon from '@mdi/react';

export const Container = styled.div`
  background: ${colors.white};
  border-radius: 16px;
`;

export const Content = styled.div`
  font-size: 15px;
  padding: 16px 20px;
`;

export const Description = styled.p`
  margin-top: 5px;
  font-weight: 400;
  font-size: 14px;
  color: ${colors.gray};
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
  display: flex;
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  color: ${colors.palette.gray[500]};
  justify-content: space-between;
`;

export const StyledIcon = styled(Icon)`
  height: 20px;
  width: 20px;
  margin-right: 6px;
`;

export const Name = styled.h3`
  font-weight: ${fonts.weight.semiBold};
`;

export const UserLabel = styled(UUserLabel)``;
