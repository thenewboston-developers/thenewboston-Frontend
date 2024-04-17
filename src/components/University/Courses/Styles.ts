import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div`
  border-radius: 4px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
`;

export const Content = styled.div`
  font-size: 15px;
  padding: 10px 20px;
`;

export const Name = styled.h3``;

export const Description = styled.p``;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FooterItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Img = styled.img`
  border-radius: 4px;
  max-height: 200px;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  display: block;
`;

export const Link = styled(ULink)`
  color: ${colors.palette.blue['400']};

  &:hover {
    color: ${colors.palette.blue['500']};
    cursor: pointer;
    text-decoration: none;
  }
`;
