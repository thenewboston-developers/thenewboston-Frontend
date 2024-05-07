import {Form as UForm} from 'formik';
import styled from 'styled-components';

import UButton from 'components/Button';
import {InlineInput as UInlineInput} from 'components/FormElements';
import {colors} from 'styles';

export const Bottom = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  border-top: 1px solid ${colors.border};
  padding: 8px 10px;
`;

export const BottomMessage = styled.div`
  height: 8px;
`;

export const Button = styled(UButton)`
  border-radius: 10px;
  background-color: ${colors.lightGray};
  color: ${colors.gray};
  padding: 6px;

  &:hover {
    background-color: ${colors.lightGray};
  }

  & svg {
    & path {
      fill: ${colors.black} !important;
    }
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-rows: auto min-content;
  height: calc(100vh - 40px);
  gap: 10px;
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
  overflow-y: auto;
  padding-top: 16px;
  background: ${colors.white};
  border-radius: 16px;
`;

export const TextInput = styled(UInlineInput)`
  flex: 1;
  background-color: ${colors.white};
  border: none;
  outline: none;

  &:focus {
    border: none;
  }
`;
