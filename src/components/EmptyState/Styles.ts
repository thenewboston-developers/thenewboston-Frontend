import styled from 'styled-components';

import {breakpoints, colors, fonts} from 'styles';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const H3 = styled.h3`
  font-weight: ${fonts.weight.semiBold};
  margin-top: 20px;
`;

export const HelperText = styled.div`
  font-size: 14px;
  margin-top: 8px;
`;

export const Img = styled.img<{$size: string}>`
  height: ${({$size}) => $size || '72px'};
  width: ${({$size}) => $size || '72px'};

  @media (max-width: ${breakpoints.mini}) {
    height: ${({$size}) => ($size ? '200px' : '72px')};
    width: ${({$size}) => ($size ? '200px' : '72px')};
  }
`;

export const SpanBlue = styled.span`
  color: ${colors.palette.blue['400']};
  cursor: pointer;
  font-weight: ${fonts.weight.semiBold};
`;

export const SpanGray = styled.span`
  color: ${colors.palette.darkGray['500']};
`;
