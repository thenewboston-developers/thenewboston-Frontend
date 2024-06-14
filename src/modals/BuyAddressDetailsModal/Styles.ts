import styled from 'styled-components';
import {Form as UForm} from 'formik';
import {Input as UInput, Select as USelect} from 'components/FormElements';
import UModal from 'components/Modal';
import {breakpoints} from 'styles';

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  min-width: 500px;
  @media (max-width: ${breakpoints.mini}) {
    min-width: 100%;
  }
`;

export const Input = styled(UInput)`
  border-radius: 14px;
`;

export const Select = styled(USelect)`
  border-radius: 14px;
`;

export const Form = styled(UForm)`
  @media (max-width: ${breakpoints.desktop}) {
    max-height: 350px;
    overflow-y: auto;
  }
`;

export const Label = styled.div`
  font-size: 12px;
  margin-bottom: 8px;
`;
