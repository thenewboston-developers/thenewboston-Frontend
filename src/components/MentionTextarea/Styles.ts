import {Field as UField} from 'formik';
import styled from 'styled-components';

import UUserLabel from 'components/UserLabel';
import {colors, formLabel, inputStyle} from 'styles';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const Dropdown = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  position: absolute;
  z-index: 1000;
`;

export const DropdownItem = styled.div<{$isSelected?: boolean}>`
  background: ${({$isSelected}) => ($isSelected ? colors.palette.gray[100] : 'transparent')};
  cursor: pointer;
  padding: 12px;
  transition: background 0.2s;

  &:hover {
    background: ${colors.palette.gray[100]};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${colors.border};
  }
`;

export const ErrorMessage = styled.div`
  color: ${colors.palette.red[400]};
  font-size: 12px;
  margin-top: 6px;
`;

export const Field = styled(UField)`
  ${inputStyle};
  border: 1px solid ${({$error}) => ($error ? colors.palette.red[400] : colors.border)};
  border-radius: 12px;
  display: block;
  height: auto;
  resize: vertical;
  width: 100%;
`;

export const Label = styled.div`
  ${formLabel};
`;

export const LoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 16px;
`;

export const NoResultsMessage = styled.div`
  color: ${colors.palette.gray[600]};
  font-size: 14px;
  padding: 16px;
  text-align: center;
`;

export const SecondaryContainer = styled.div``;

export const UserLabel = styled(UUserLabel)`
  width: 100%;
`;
