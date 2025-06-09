import {Form as UForm} from 'formik';
import styled from 'styled-components';

import {Input as UInput, LogoInput} from 'components/FormElements';
import ULine from 'components/Line';
import {breakpoints, colors} from 'styles';

const WITHDRAW_IMAGE_SIZE = 363;

export const AmountLogoInput = styled(LogoInput)`
  background: ${colors.white};
  width: 100%;
`;

export const Container = styled.div`
  padding: 16px 16px 24px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 18px 10px;
  }
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

export const DetailRowContainer = styled.div`
  margin-bottom: 24px;
`;

export const EmptyState = styled.div`
  color: ${colors.secondary};
  padding: 60px 20px;
  text-align: center;

  p {
    font-size: 14px;
    margin: 0;
  }
`;

export const Form = styled(UForm)`
  margin: 16px 0;
  min-width: 270px;

  @media (max-width: ${breakpoints.mobile}) {
    flex-grow: 1;
    min-width: auto;
  }
`;

export const Image = styled.img`
  height: ${WITHDRAW_IMAGE_SIZE}px;
  width: ${WITHDRAW_IMAGE_SIZE}px;

  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }

  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    display: none;
  }
`;

export const Input = styled(UInput)`
  background: ${colors.white};
  border-radius: 14px;
  width: 100%;
`;

export const Label = styled.div`
  color: ${colors.secondary};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const Line = styled(ULine)`
  border-top: 1px solid ${colors.black};
  margin: 4px 0;
`;

export const Panel = styled.div`
  background: ${colors.background};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
`;

export const Text = styled.div`
  color: ${colors.secondary};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const Title = styled.div`
  color: ${colors.primary};
  font-size: 15px;
  font-weight: 600;
`;

export const Value = styled.div`
  color: ${colors.primary};
  font-size: 15px;
  font-weight: 600;
`;

export const WithdrawSection = styled.div`
  margin-top: 24px;
`;

export const InternalCurrencyMessage = styled.div`
  padding: 40px;
  text-align: center;

  ${Title} {
    color: ${colors.primary};
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  ${Text} {
    color: ${colors.secondary};
    font-size: 14px;
    font-weight: 400;
    letter-spacing: normal;
    line-height: 1.5;
    text-transform: none;
  }
`;
