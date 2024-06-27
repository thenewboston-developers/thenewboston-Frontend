import styled from 'styled-components';

import {colors} from 'styles';

export const ErrorMessage = styled.div`
  color: ${colors.palette.red['400']};
  font-size: 12px;
  margin-top: 6px;
`;

export const SecondaryContainer = styled.div``;

export const Span = styled.span`
  cursor: pointer;
`;

export const Link = styled.a`
  color: ${colors.palette.blue[300]};
  overflow: hidden;
  position: relative;
  text-decoration: underline;

  &:hover {
    color: ${colors.palette.blue[700]};
  }
`;

export const FileInput = styled.input`
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
`;
