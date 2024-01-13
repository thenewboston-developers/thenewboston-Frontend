import {Form as UForm} from 'formik';
import styled from 'styled-components';

import UButton from 'components/Button';
import {InlineInput as UInlineInput} from 'components/FormElements';
import {colors} from 'styles';

export const Bottom = styled.div`
  border-top: 1px solid ${colors.border};
  padding: 16px 12px;
`;

export const Button = styled(UButton)`
  display: none;
`;

export const Container = styled.div`
  display: grid;
  grid-template-rows: auto min-content;
  height: 100vh;
`;

export const Form = styled(UForm)`
  align-items: center;
  display: flex;
`;

export const GreetingContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

export const GreetingElements = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const GreetingText = styled.h2`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export const TextInput = styled(UInlineInput)`
  flex: 1;
  margin-left: 12px;
`;

export const Top = styled.div`
  overflow-y: auto;
`;
