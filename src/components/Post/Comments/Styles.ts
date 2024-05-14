import {Form as UForm} from 'formik';
import styled from 'styled-components';
import UIcon from '@mdi/react';
import UButton from 'components/Button';
import {InlineInput as UInlineInput} from 'components/FormElements';
import {breakpoints, colors} from 'styles';

export const IMG_HEIGHT = 24;

export const Button = styled(UButton)`
  padding: 10px;
  height: 40px;
  background-color: #f4f5f6;
  color: ${colors.black};

  & svg {
    margin-right: 0px !important;
    & path {
      fill: ${colors.black} !important;
    }
  }
  &:hover {
    background: none !important;
  }
`;

export const Container = styled.div`
  margin-top: 16px;
`;

export const ContentInput = styled(UInlineInput)`
  flex: 1;
  width: 100%;
  border-radius: 12px;
  position: relative;
  background-color: ${colors.white};
  padding: 26px 300px 26px 16px;
  @media (max-width: ${breakpoints.mini}) {
    margin: 8px 0;

    width: 100%;
  }
`;

export const Form = styled(UForm)`
  align-items: center;
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const Icon = styled(UIcon)`
  color: ${colors.secondary};
  margin-left: 12px;

  &:hover {
    color: ${colors.backgroundDark};
    cursor: pointer;
  }
`;

export const IconContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const IconRight = styled(UIcon)`
  margin-left: 6px;
`;

export const Img = styled.img`
  border-radius: 50%;
  height: ${`${IMG_HEIGHT}px`};
  margin-left: 12px;
  width: ${`${IMG_HEIGHT}px`};

  &:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.16);
    cursor: pointer;
  }
`;

export const PriceAmountInput = styled(UInlineInput)`
  border-left: 1px solid ${colors.borderDarker};
  border-radius: 0 8px 8px 0;
  margin-left: 8px;
  width: 130px;

  @media (max-width: ${breakpoints.mini}) {
    height: 40px;
  }
`;

export const PriceAmountInputContainer = styled.div`
  align-items: center;
  background-color: ${colors.whiteHover};
  border-radius: 8px;
  display: grid;
  grid-auto-flow: column;
  margin-left: 12px;

  @media (max-width: ${breakpoints.mini}) {
    width: 75%;
  }
`;

export const CommentBtn = styled(UButton)`
  background-color: #f4f5f6;
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
  color: #5a80ab;
  width: 500px;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  position: absolute;
  right: 10px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
`;

export const Div = styled.div`
  border: 1px solid ${colors.border};
  width: 100%;
`;
