import styled from 'styled-components';

import {breakpoints, colors, fonts} from 'styles';
import {Form as _Form} from 'formik';
import _Button from 'components/Button';

export const AvailableBalance = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled(_Button)<{$color?: string}>`
  width: 100%;
  background: ${(props) => props.$color || ''};
  color: ${(props) => (props.$color === 'transparent' ? colors.black : colors.white)};

  &:hover {
    background: ${(props) => (props.$color === 'transparent' ? 'unset' : colors.palette.red['500'])};
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 16px 30px;

  @media (min-width: ${breakpoints.mobile}) {
    flex-direction: row;
  }
`;

export const FormContainer = styled.div`
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  width: 40%;
`;

export const Form = styled(_Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2px;
  @media (min-width: ${breakpoints.mobile}) {
    width: 40%;
  }
`;

export const Card = styled.div`
  background: ${colors.white};
  padding: 16px;
  border-radius: 16px;
  overflow: auto;

  h2 {
    color: ${colors.gray};
    font-size: 12px;
    line-height: 20px;
    font-weight: ${fonts.weight.bold};
    margin-bottom: 10px;
  }

  textarea {
    background: ${colors.white};
    height: 50vh;
    border: none;
    outline: none;
    box-shadow: none;
    resize: none;
    overflow: auto;
    padding: 0;

    &::placeholder {
      font-weight: ${fonts.weight.semiBold};
      font-size: 16px;
      line-height: 26px;
    }
  }
`;

export const ImageCarouselContainer = styled.div`
  padding: 24px 16px;
  width: 100%;
  @media (min-width: ${breakpoints.mobile}) {
    width: 60%;
  }
`;

export const CardHeader = styled.h2`
  color: ${colors.gray};
  font-size: 12px;
  line-height: 20px;
  font-weight: ${fonts.weight.bold};
  margin-bottom: 10px;
`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input[type='radio'] {
    display: none;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1.5px solid #ededed;
    text-align: center;
    line-height: 20px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  gap: ${(props) => props.$gap || 0}px;
  border-bottom: 1px solid #f1f1f1;

  &:nth-child(3),
  &:nth-child(4) {
    border-bottom: none;
  }

  h3 {
    font-weight: ${fonts.weight.regular};
    font-size: 16px;
    line-height: 26px;
    color: ${colors.black};
  }

  &:nth-child(3) {
    h3 {
      font-weight: ${fonts.weight.bold};
      font-size: 16px;
      line-height: 26px;
    }

    span {
      font-weight: ${fonts.weight.bold};
      font-size: 16px;
      line-height: 26px;
    }
  }
`;
