import styled from 'styled-components';

import {breakpoints, colors, fonts} from 'styles';

export const Container = styled.div<{$displayStyle?: string}>`
  background-color: ${colors.white};
  border-radius: 14px;
  border: 1px solid ${colors.border};
  display: ${({$displayStyle}) => $displayStyle || 'block'};
  padding: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    display: block;
  }
`;

export const ContentContainer = styled.div<{$width?: string}>`
  width: ${({$width}) => $width || '100%'};

  @media (max-width: ${breakpoints.mobile}) {
    width: auto;
  }
`;

export const Content = styled.div`
  font-size: 14px;
  margin: 10px 0px;
`;

export const Logo = styled.img<{width?: string}>`
  object-fit: cover;
  width: ${({width}) => width || '50px'};
`;

export const LogoContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 15px 0px;
  width: 100%;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: ${fonts.weight.bold};
`;
