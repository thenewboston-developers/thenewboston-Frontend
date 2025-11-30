import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

export const Container = styled(Link)`
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

export const CurrencyLogo = styled.img`
  border-radius: 50%;
  height: 22px;
  width: 22px;
`;

export const Image = styled.img`
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

export const ImagePlaceholder = styled.div`
  align-items: center;
  background: ${colors.palette.gray[100]};
  color: ${colors.secondary};
  display: flex;
  font-size: 14px;
  height: 100%;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  width: 100%;
`;

export const ImageWrapper = styled.div`
  aspect-ratio: 3 / 2;
  background: ${colors.palette.gray[50]};
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
`;

export const Name = styled.h3`
  font-size: 20px;
  font-weight: ${fonts.weight.semiBold};
  margin: 0;
`;

export const Price = styled.span`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
`;

export const PriceRow = styled.div`
  align-items: center;
  display: flex;
  gap: 6px;
  margin-top: 2px;
`;

export const Species = styled.span`
  color: ${colors.secondary};
  font-size: 13px;
`;

export const Teaser = styled.p`
  color: ${colors.palette.gray[700]};
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
`;
