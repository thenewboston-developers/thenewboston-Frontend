import styled from 'styled-components';

import {Textarea as UTextarea} from 'components/FormElements';
import {breakpoints, colors, fonts, inputStyle, pagePadding} from 'styles';

export {Input, Textarea} from 'components/FormElements';

export const ArrayHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const ArrayItem = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  margin-bottom: 10px;

  @media (max-width: ${breakpoints.tablet}) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const ArraySection = styled.div`
  border-top: 1px solid ${colors.border};
  padding-top: 16px;
`;

export const ArrayTitle = styled.h4`
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  margin: 0;
`;

export const Container = styled.div`
  ${pagePadding};
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

export const FileButton = styled.label`
  background: ${colors.background};
  border: 1px dashed ${colors.border};
  border-radius: 8px;
  color: ${colors.primary};
  cursor: pointer;
  display: inline-flex;
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
  padding: 8px 12px;
  width: fit-content;
`;

export const FileName = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
`;

export const FormActions = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 8px;
`;

export const FormContent = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
`;

export const FormRow = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const ImageControls = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6px;
`;

export const ImageActions = styled.div`
  align-items: center;
  display: flex;
  gap: 6px;
`;

export const IconButton = styled.button`
  align-items: center;
  background: ${colors.whiteHover};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  color: ${colors.primary};
  cursor: pointer;
  display: inline-flex;
  height: 34px;
  justify-content: center;
  padding: 6px;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;

  &:hover:enabled {
    background: ${colors.background};
    border-color: ${colors.primary};
    color: ${colors.primary};
  }

  &:disabled {
    color: ${colors.secondary};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const ImagePlaceholder = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  padding: 0 8px;
  text-align: center;
`;

export const ImagePreview = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

export const ImagePreviewWrapper = styled.div`
  align-items: center;
  background: ${colors.background};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  display: flex;
  height: 80px;
  justify-content: center;
  overflow: hidden;
  width: 80px;
`;

export const LoaderWrapper = styled.div`
  align-items: center;
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  min-height: 240px;
`;

export const PlainInput = styled.input<{$error?: boolean}>`
  ${inputStyle};
  border: 1px solid ${({$error}) => ($error ? colors.palette.red[400] : colors.border)};
  border-radius: 12px;
  width: 100%;

  &:focus {
    border-color: ${({$error}) => ($error ? colors.palette.red[400] : colors.palette.blue[200])};
    outline: none;
  }
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${colors.palette.red[600]};
  cursor: pointer;
  font-size: 13px;
  padding: 6px 0;
`;

export const Select = styled.select<{$error?: boolean}>`
  ${inputStyle};
  appearance: none;
  background: ${colors.whiteHover};
  border: 1px solid ${({$error}) => ($error ? colors.palette.red[400] : colors.border)};
  border-radius: 12px;
  width: 100%;

  &:focus {
    border-color: ${({$error}) => ($error ? colors.palette.red[400] : colors.palette.blue[200])};
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const TallTextarea = styled(UTextarea)`
  min-height: 140px;
`;

export const ThirdsRow = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
`;
