import UIcon from '@mdi/react';
import styled from 'styled-components';

import {colors, fonts} from 'styles';

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

export const UploadButton = styled.label`
  align-items: center;
  background-color: transparent;
  border: 1px solid ${colors.palette.gray[200]};
  border-radius: 24px;
  color: ${colors.palette.gray[700]};
  cursor: pointer;
  display: inline-flex;
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
  gap: 6px;
  height: 36px;
  padding: 0 16px;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: ${colors.palette.gray[100]};
    border-color: ${colors.palette.gray[300]};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    color: ${colors.palette.gray[900]};
  }

  &:active {
    background-color: ${colors.palette.gray[200]};
    box-shadow: none;
  }
`;

export const UploadIcon = styled(UIcon)`
  fill: ${colors.palette.gray[600]};
  transition: fill 0.15s ease;

  ${UploadButton}:hover & {
    fill: ${colors.palette.gray[800]};
  }
`;

export const UploadText = styled.span`
  font-family: ${fonts.family.default};
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
`;
