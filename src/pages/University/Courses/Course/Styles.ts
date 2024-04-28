import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {colors} from 'styles';
import UUserLabel from 'components/UserLabel';
import UIcon from '@mdi/react';

export const ActionButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
`;

export const Icon = styled(UIcon)`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const Container = styled.div`
  border-radius: 4px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
`;

export const Content = styled.div`
  font-size: 15px;
  padding: 10px 20px;
`;

export const Description = styled.div`
  margin: 5px 0px 10px 0px;
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

export const Img = styled.img`
  border-radius: 4px;
  display: block;
  max-height: 200px;
  max-width: 100%;
  object-fit: cover;
  width: 100%;
`;

export const Link = styled(ULink)`
  color: ${colors.palette.blue['400']};

  &:hover {
    color: ${colors.palette.blue['500']};
    cursor: pointer;
    text-decoration: none;
  }
`;

export const Name = styled.h3``;

export const UserLabel = styled(UUserLabel)``;
