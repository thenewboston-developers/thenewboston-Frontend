import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {colors} from 'styles';
import UUserLabel from 'components/UserLabel';

export const Container = styled.div`
  border-radius: 4px;
  border: 1px solid ${colors.border};
`;

export const Content = styled.div`
  font-size: 15px;
  padding: 10px 20px;
`;

export const Description = styled.p`
  margin-top: 5px;
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
  justify-content: space-between;
`;

export const Name = styled.h3``;

export const UserLabel = styled(UUserLabel)``;
