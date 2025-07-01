import styled from 'styled-components';

import UUserLabel from 'components/UserLabel';
import {colors, fonts, formLabel, inputStyle} from 'styles';

export const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${colors.palette.gray[600]};
  cursor: pointer;
  font-size: 20px;
  padding: 0 8px;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    color: ${colors.palette.gray[800]};
  }
`;

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
  top: 100%;
  width: 100%;
  z-index: 1000;
`;

export const DropdownItem = styled.div`
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
  color: ${colors.palette.red[500]};
  font-size: 12px;
  margin-top: 4px;
`;

export const Input = styled.input<{$error?: boolean}>`
  ${inputStyle};
  border: 1px solid ${({$error}) => ($error ? colors.palette.red[400] : colors.border)};
  border-radius: 12px;
  padding-right: 40px;
  width: 100%;
`;

export const InputWrapper = styled.div`
  position: relative;
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

export const UserLabel = styled(UUserLabel)`
  width: 100%;
`;
