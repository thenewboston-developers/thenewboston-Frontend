import styled from 'styled-components';

import {
  FileInput as UFileInput,
  UploadButton as UUploadButton,
  UploadIcon as UUploadIcon,
  UploadText as UUploadText,
} from 'components/FormElements/FileInput/Styles';
import {colors, radii, shadows} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FileInput = styled(UFileInput)``;

export const Footer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  min-height: 36px;
`;

export const Preview = styled.div`
  aspect-ratio: 1 / 1;
  background: ${colors.palette.gray[100]};
  border-radius: ${radii.medium};
  overflow: hidden;
  position: relative;
`;

export const PreviewImage = styled.img`
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

export const Previews = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

export const RemoveButton = styled.button`
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  border: none;
  border-radius: 0 ${radii.medium} 0 ${radii.medium};
  color: ${colors.white};
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 4px;
  position: absolute;
  right: 0;
  top: 0;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  &:focus-visible {
    box-shadow: inset ${shadows.focusRing};
    outline: none;
  }
`;

export const Status = styled.div`
  color: ${colors.secondary};
  font-size: 13px;
`;

export const UploadButton = styled(UUploadButton)<{$disabled: boolean}>`
  opacity: ${({$disabled}) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({$disabled}) => ($disabled ? 'none' : 'auto')};
`;

export const UploadIcon = styled(UUploadIcon)``;

export const UploadText = styled(UUploadText)``;
