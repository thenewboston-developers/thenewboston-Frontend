import styled from 'styled-components';

import {breakpoints, colors, fonts, pagePadding, toolbarStyle} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Header = styled.div`
  ${toolbarStyle};
`;

export const BackButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  color: ${colors.secondary};
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  gap: 8px;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: ${colors.primary};
  }

  span {
    font-family: ${fonts.family.default};
  }
`;

export const Content = styled.div`
  ${pagePadding};
  flex: 1;
`;

export const Layout = styled.div`
  column-gap: 40px;
  display: grid;
  grid-template-columns: 3fr 2fr;
  margin: 0 auto;
  max-width: 1200px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    row-gap: 32px;
  }
`;

export const MediaColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MainImageButton = styled.button`
  aspect-ratio: 4 / 3;
  background: transparent;
  border: none;
  border-radius: 12px;
  cursor: zoom-in;
  margin: 0;
  overflow: hidden;
  padding: 0;
  width: 100%;

  &:focus {
    outline: 3px solid ${colors.palette.blue[300]};
  }
`;

export const MainImage = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

export const Thumbnails = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
`;

export const ThumbnailButton = styled.button<{$isActive: boolean}>`
  aspect-ratio: 4 / 3;
  background: transparent;
  border: 2px solid ${({$isActive}) => ($isActive ? colors.palette.blue[500] : colors.border)};
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  padding: 0;
  transition: border 0.2s ease;

  &:hover {
    border-color: ${colors.palette.blue[500]};
  }
`;

export const ThumbnailImage = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

export const DetailsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: ${fonts.weight.semiBold};
  margin: 0;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 26px;
  }
`;

export const Subtitle = styled.p`
  color: ${colors.secondary};
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${colors.border};
  margin: 8px 0 0;
`;

export const DetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DetailLabel = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const DetailValue = styled.span`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: ${fonts.weight.medium};
`;

export const Description = styled.p`
  color: ${colors.palette.gray[800]};
  font-size: 15px;
  line-height: 1.7;
  margin: 8px 0 0;
`;

export const HighlightTitle = styled.h3`
  font-size: 14px;
  letter-spacing: 0.1em;
  margin: 8px 0 0;
  text-transform: uppercase;
`;

export const HighlightList = styled.ul`
  color: ${colors.palette.gray[800]};
  display: flex;
  flex-direction: column;
  gap: 8px;
  line-height: 1.5;
  margin: 8px 0 0;
  padding-left: 18px;

  li {
    list-style: disc;
  }
`;
