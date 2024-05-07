import {Form as UForm} from 'formik';
import styled from 'styled-components';
import UIcon from '@mdi/react';

import UButton from 'components/Button';
import {InlineInput as UInlineInput} from 'components/FormElements';
import {breakpoints, colors} from 'styles';

export const IMG_HEIGHT = 24;

export const Button = styled(UButton)`
  display: none;
`;

export const Container = styled.div`
  margin-top: 16px;
`;

export const ContentInput = styled(UInlineInput)`
  flex: 1;
  margin-left: 12px;

  @media (max-width: ${breakpoints.mini}) {
    margin: 8px 0;
    width: 100%;
  }
`;

export const Form = styled(UForm)`
  align-items: center;
  display: flex;
  flex-direction: row;

  @media (max-width: ${breakpoints.mini}) {
    align-items: stretch;
    flex-direction: column;
  }
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
    margin: 8px 0;
    width: 100%;
  }
`;

export const PriceAmountInputContainer = styled.div`
  align-items: center;
  background-color: ${colors.whiteHover};
  border-radius: 8px;
  display: grid;
  grid-auto-flow: column;
  margin-left: 12px;
`;
