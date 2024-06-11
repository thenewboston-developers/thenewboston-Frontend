import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Container = styled.div`
  background-color: ${colors.white};
  border-radius: 14px;
  border: 1px solid ${colors.border};
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  padding: 20px;
`;

export const ContentContainer = styled.div<{$displayStyle?: string}>`
  display: ${({$displayStyle}) => $displayStyle || 'block'};
`;

export const Content = styled.div<{$width?: string}>`
  font-size: 14px;
  margin: 10px 0px;
  width: ${({$width}) => $width || '100%'};
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
