import styled, {css} from 'styled-components';

import {breakpoints, colors, fonts, pagePadding} from 'styles';

export const Container = styled.div`
  ${pagePadding};
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
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

export const Form = styled.form`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const LabelRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const baseInputStyles = css`
  border: 1px solid ${colors.border};
  border-radius: 10px;
  font-family: ${fonts.family.default};
  font-size: 14px;
  padding: 10px 12px;
  width: 100%;

  &:focus {
    border-color: ${colors.palette.blue[500]};
    outline: none;
  }
`;

export const Input = styled.input`
  ${baseInputStyles};
`;

export const Select = styled.select`
  ${baseInputStyles};
  background: ${colors.white};
`;

export const Textarea = styled.textarea`
  ${baseInputStyles};
  resize: vertical;
`;

export const FormRow = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;

export const ArraySection = styled.div`
  border-top: 1px solid ${colors.border};
  padding-top: 16px;
`;

export const ArrayHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const ArrayTitle = styled.h4`
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  margin: 0;
`;

export const ArrayItem = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  margin-bottom: 10px;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
  }
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

export const ImagePreview = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

export const ImagePlaceholder = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  padding: 0 8px;
  text-align: center;
`;

export const ImageControls = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6px;
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

export const HiddenFileInput = styled.input`
  display: none;
`;

export const FileName = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${colors.palette.red[600]};
  cursor: pointer;
  font-size: 13px;
  padding: 6px 0;
`;

export const FormActions = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 8px;
`;

export const ErrorText = styled.span`
  color: ${colors.palette.red[600]};
  font-size: 12px;
  margin-top: 4px;
`;
