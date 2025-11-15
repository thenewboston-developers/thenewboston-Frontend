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
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
    text-decoration: none;
  }

  &:focus {
    text-decoration: none;
  }
`;

export const CardImage = styled.img`
  border-radius: 12px;
  flex: 1;
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
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

export const PriceRow = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

export const TNBLogo = styled.img`
  border-radius: 50%;
  height: 22px;
  width: 22px;
`;

export const Price = styled.span`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
`;
