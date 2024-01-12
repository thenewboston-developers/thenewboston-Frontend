import {Form as UForm} from 'formik';
import styled from 'styled-components';

import UButton from 'components/Button';
import {InlineInput as UInlineInput} from 'components/FormElements';
import {colors} from 'styles';

export const Bottom = styled.div`
  padding: 16px 12px;
`;

export const Button = styled(UButton)`
  display: none;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100vh;
`;

export const Form = styled(UForm)`
  align-items: center;
  display: flex;
`;

export const MessagesContainer = styled.div`
  border-bottom: 1px solid ${colors.border};
  overflow-y: auto;
`;

export const Right = styled.div`
  display: grid;
  grid-template-rows: auto min-content;
  height: 100vh;
`;

export const TextInput = styled(UInlineInput)`
  flex: 1;
  margin-left: 12px;
`;
