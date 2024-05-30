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
  gap: 10px;
  grid-template-rows: auto min-content;
  height: calc(100vh - 726px);
`;

export const Form = styled(UForm)`
  align-items: center;
  display: flex;
`;

export const GreetingContainer = styled.div`
  //align-items: center;
  background: ${colors.white};
  border-radius: 16px;
  //display: flex;
  height: 100%;
  //justify-content: center;
`;

export const GreetingElements = styled.div`
  display: flex;
  padding: 10px 0px 0px 10px;
  //flex-direction: column;
`;

export const GreetingText = styled.div`
  //align-items: center;
  display: flex;
  //flex-direction: column;
  font-size: 15px;
  font-weight: 700;
  margin-top: 4px;
  margin-left: 8px;
`;
export const Span = styled.div`
  font-size: 20px;
  font-weight: 800;
  margin-left: 8px;
  color: darkgray;
  margin-top: -6px;
`;
export const Strong = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin-left: 8px;
  margin-top: 2px;
`;

export const SubText = styled.div`
  background-color: rgb(236, 236, 236);
  border-radius: 0px 10px 10px;
  color: rgb(0, 0, 0);
  display: inline-block;
  font-size: 14px;
  font-weight: 300;
  line-height: 18px;
  max-width: 75%;
  padding: 10px;
  margin-left: 55px;
`;

export const MessagesContainer = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-top: 16px;
`;

export const TextInput = styled(UInlineInput)`
  background-color: ${colors.white};
  border: none;
  flex: 1;
  outline: none;
  &:focus {
    border: none;
  }
`;

export const Avatar = styled.div`
  background: white;
  //height: 80px;
  //width: 80px;
`;

export const Image = styled.img`
  border-radius: 16px;
`;
