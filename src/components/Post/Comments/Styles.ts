import {Form as UForm} from 'formik';
import styled from 'styled-components';

import UButton from 'components/Button';
import {InlineInput as UInlineInput} from 'components/FormElements';

export const Button = styled(UButton)`
  margin-left: 12px;
`;

export const Container = styled.div`
  margin-top: 16px;
`;

export const Form = styled(UForm)`
  align-items: center;
  display: flex;
`;

export const InlineInput = styled(UInlineInput)`
  flex: 1;
  margin-left: 12px;
`;
