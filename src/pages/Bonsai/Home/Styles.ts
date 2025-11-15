import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {breakpoints, colors, fonts, pagePadding} from 'styles';

export const Container = styled.div`
  ${pagePadding};
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const CardGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 12px;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled(Link)`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 14px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  color: inherit;
  display: flex;
  flex-direction: column;
  padding: 16px 18px 20px;
  text-decoration: none;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgb(0 0 0 / 12%);
    text-decoration: none;
  }

  &:focus {
    text-decoration: none;
  }
`;

export const CardImage = styled.img`
  border-radius: 12px;
  height: 210px;
  object-fit: cover;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    height: 180px;
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
`;

export const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: ${fonts.weight.semiBold};
  margin: 0;
`;

export const CardMeta = styled.span`
  color: ${colors.secondary};
  font-size: 13px;
`;

export const CardTeaser = styled.p`
  color: ${colors.palette.gray[700]};
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
`;
