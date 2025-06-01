import styled from 'styled-components';

import {breakpoints, colors, fonts} from 'styles';

export const Container = styled.div<{$displayStyle?: string; $minHeight?: string}>`
  background-color: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 14px;
  display: ${({$displayStyle}) => $displayStyle || 'block'};
  min-height: ${({$minHeight}) => $minHeight || 'auto'};
  padding: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    display: block;
  }

  @media (max-width: ${breakpoints.tablet}) {
    min-height: auto;
  }
`;

export const Content = styled.div`
  font-size: 14px;
  margin: 10px 0;
  white-space: normal;
  word-break: normal;
  word-wrap: normal;
`;

export const ContentContainer = styled.div<{$width?: string}>`
  width: ${({$width}) => $width || '100%'};

  @media (max-width: ${breakpoints.mobile}) {
    width: auto;
  }
`;

export const DetailText = styled.p`
  margin: 0;
  white-space: pre-line;
`;

export const Img = styled.img`
  object-fit: cover;
  width: 100%;
`;

export const Logo = styled.img<{width?: string}>`
  object-fit: cover;
  width: ${({width}) => width || '50px'};
`;

export const LogoContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 0 15px 0;
  width: 100%;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: ${fonts.weight.bold};
`;
