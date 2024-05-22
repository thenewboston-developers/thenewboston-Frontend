import styled from 'styled-components';

import _Button from 'components/Button';
import {Form as _Form} from 'formik';
import {CreateOpenAIImageResponse} from 'types';
import {breakpoints, colors, fonts} from 'styles';

export const AvailableBalance = styled.div`
  align-items: center;
  display: flex;
`;

export const Button = styled(_Button)<{$color?: string}>`
  background: ${(props) => props.$color || ''};
  color: ${(props) => (props.$color === 'transparent' ? colors.black : colors.white)};
  width: 100%;

  &:hover {
    background: ${(props) => (props.$color === 'transparent' ? 'unset' : colors.palette.red['500'])};
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 30px;
  width: 100%;
  @media (min-width: ${breakpoints.mobile}) {
    flex-direction: row;
  }
`;

export const Form = styled(_Form)`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;

  @media (min-width: ${breakpoints.mobile}) {
    width: 40%;
  }
`;

export const Card = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  overflow: auto;
  padding: 16px;

  h2 {
    color: ${colors.gray};
    font-size: 12px;
    font-weight: ${fonts.weight.bold};
    line-height: 20px;
    margin-bottom: 10px;
  }

  textarea {
    background: ${colors.white};
    border: none;
    box-shadow: none;
    height: 50vh;
    outline: none;
    overflow: auto;
    padding: 0;
    resize: none;

    &::placeholder {
      font-size: 16px;
      font-weight: ${fonts.weight.semiBold};
      line-height: 26px;
    }
  }
`;

export const ImageCarouselContainer = styled.div<{$createOpenAIImageResponse: CreateOpenAIImageResponse | null}>`
  align-items: ${({$createOpenAIImageResponse}) => ($createOpenAIImageResponse ? 'initial' : 'center')};
  display: flex;
  flex-direction: column;
  justify-content: ${({$createOpenAIImageResponse}) => ($createOpenAIImageResponse ? 'initial' : 'center')};
  padding: 24px 16px;
  width: 100%;
  @media (min-width: ${breakpoints.mobile}) {
    width: 60%;
  }
`;

export const CardHeader = styled.h2`
  color: ${colors.gray};
  font-size: 12px;
  font-weight: ${fonts.weight.bold};
  line-height: 20px;
  margin-bottom: 10px;
`;

export const RadioGroup = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;

  input[type='radio'] {
    display: none;
  }

  span {
    align-items: center;
    border-radius: 50%;
    border: 1.5px solid #ededed;
    cursor: pointer;
    display: flex;
    height: 34px;
    justify-content: center;
    line-height: 20px;
    text-align: center;
    width: 34px;
  }

  input[type='radio']:checked + span {
    background-color: black;
    color: white;
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div<{$gap?: number}>`
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  gap: ${(props) => props.$gap || 0}px;
  justify-content: space-between;
  padding: 10px 0;

  &:nth-child(3),
  &:nth-child(4) {
    border-bottom: none;
  }

  h3 {
    color: ${colors.black};
    font-size: 16px;
    font-weight: ${fonts.weight.regular};
    line-height: 26px;
  }

  &:nth-child(3) {
    h3 {
      font-size: 16px;
      font-weight: ${fonts.weight.bold};
      line-height: 26px;
    }

    span {
      font-size: 16px;
      font-weight: ${fonts.weight.bold};
      line-height: 26px;
    }
  }
`;
