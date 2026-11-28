import {Form as UForm} from 'formik';
import styled from 'styled-components';

import {Input as UInput, LogoInput} from 'components/FormElements';
import ULine from 'components/Line';
import {breakpoints, cardStyle, colors, eyebrowStyle, fonts, radii} from 'styles';

const WITHDRAW_IMAGE_SIZE = 363;

export const AmountLogoInput = styled(LogoInput)`
  background: ${colors.white};
  width: 100%;
`;

export const Container = styled.section`
  ${cardStyle};
  padding: 20px 24px 24px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 18px 16px 20px;
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

export const Form = styled(UForm)`
  margin: 16px 0;
  min-width: 270px;

  @media (max-width: ${breakpoints.mobile}) {
    flex-grow: 1;
    min-width: auto;
  }
`;

export const Heading = styled.h3`
  color: ${colors.primary};
  font-size: 18px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.02em;
  line-height: 1.3;
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
  ${eyebrowStyle};
`;

export const Line = styled(ULine)`
  border-top: 1px solid ${colors.black};
  margin: 4px 0;
`;

export const Panel = styled.div`
  background: ${colors.background};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.large};
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 16px;
`;

export const SubHeading = styled.p`
  color: ${colors.secondary};
  font-size: 13px;
  line-height: 1.6;
  margin: 4px 0 0;
  max-width: 560px;
`;

export const Title = styled.h4`
  color: ${colors.primary};
  font-size: 15px;
  font-weight: ${fonts.weight.semiBold};
  margin-bottom: 8px;
`;

export const Value = styled.div`
  color: ${colors.primary};
  font-size: 15px;
  font-weight: 600;
`;

export const WithdrawSection = styled.div`
  margin-top: 24px;
`;
