import {Form as UForm} from 'formik';
import styled from 'styled-components';
import UMdiIcon from '@mdi/react';

import UButton from 'components/Button';
import {InlineInput as UInlineInput} from 'components/FormElements';
import {colors} from 'styles';

import {breakpoints} from 'styles';

export const IMG_HEIGHT = 24;

export const Button = styled(UButton)`
  display: none;
`;

export const Container = styled.div`
  margin-top: 16px;
`;

export const Icon = styled(UMdiIcon)`
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

export const Form = styled(UForm)`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: ${breakpoints.mini}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const ContentInput = styled(UInlineInput)`
  margin-left: 12px;
  flex: 1;

  @media (max-width: ${breakpoints.mini}) {
    margin: 8px 0;
    width: 100%;
  }
`;

export const PriceAmountInput = styled(UInlineInput)`
  margin-left: 12px;
  width: 80px;

  @media (max-width: ${breakpoints.mini}) {
    margin: 8px 0;
    width: 100%;
  }
`;

export const PriceAmountInputContainer = styled.div`
  display: flex;
`;
