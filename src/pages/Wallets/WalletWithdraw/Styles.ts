import {Form as UForm} from 'formik';
import styled from 'styled-components';
import {Input as UInput} from 'components/FormElements';
import ULine from 'components/Line';
import {LogoInput} from 'components/FormElements';
import {breakpoints, colors, fonts} from 'styles';

const WITHDRAW_IMAGE_SIZE = 363;

export const Container = styled.div``;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
`;

export const DetailRowContainer = styled.div`
  margin-bottom: 24px;
`;

export const Form = styled(UForm)`
  margin: 16px 0px;
  min-width: 270px;
  @media (max-width: ${breakpoints.mobile}) {
    flex-grow: 1;
    min-width: auto;
  }
`;

export const Input = styled(UInput)`
  background: ${colors.white};
  border-radius: 14px;
  width: 100%;
`;

export const Label = styled.div`
  color: ${colors.gray};
  font-weight: ${fonts.weight.bold};
`;

export const Line = styled(ULine)`
  border-top: 1px solid ${colors.black};
  margin: 4px 0;
`;

// TODO: Standardize
export const Panel = styled.div`
  background: ${colors.background};
  border-radius: 16px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding: 0px 16px;
`;

export const Value = styled.div`
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
`;

export const AmountLogoInput = styled(LogoInput)`
  background: ${colors.white};
  width: 100%;
`;
export const Div = styled.div`
  padding: 16px 0px;
`;
export const Title = styled.div`
  color: ${colors.gray};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};
`;

export const Img = styled.img`
  height: ${WITHDRAW_IMAGE_SIZE}px;
  width: ${WITHDRAW_IMAGE_SIZE}px;

  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    display: none;
  }
`;
