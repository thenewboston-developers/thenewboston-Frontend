import styled from 'styled-components';

import UUserLabel from 'components/UserLabel';
import {breakpoints, colors, fonts} from 'styles';
import _Button from 'components/Button';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

export const Button = styled(_Button)<ButtonProps>`
  border-radius: 100px;
  border: 1.5px solid ${(props) => (props.variant === 'primary' ? colors.primary : colors.black)};
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${fonts.weight.semiBold};
  padding: 8px 15px;
  color: ${(props) => (props.variant === 'primary' ? colors.primary : colors.black)};

  @media (min-width: ${breakpoints.mini}) {
    min-width: 130px;
    padding: 8px 30px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 19px;
  font-weight: ${fonts.weight.semiBold};
  gap: 1rem;

  button {
    width: 100%;
  }

  @media (min-width: ${breakpoints.mini}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    button {
      width: fit-content;
    }
  }

  @media (min-width: ${breakpoints.mobile}) {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    button {
      width: 100%;
    }
  }
  @media (min-width: ${breakpoints.desktop}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    button {
      width: fit-content;
    }
  }
`;

export const InnerButtonContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
  @media (min-width: ${breakpoints.mobile}) {
    gap: 10px;
    width: 100%;
  }
  @media (min-width: ${breakpoints.desktop}) {
    gap: 10px;
    width: fit-content;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 30px;

  @media (min-width: ${breakpoints.mobile}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const CreatedDate = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const DescriptionHeader = styled.h6`
  color: ${colors.gray};
  font-weight: ${fonts.weight.bold};
  font-size: 12px;
  line-height: 20px;
  text-transform: uppercase;
`;

export const Description = styled.p`
  color: ${colors.black};
  font-weight: ${fonts.weight.regular};
  font-size: 14px;
  line-height: 26px;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 1;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DateContainer = styled.div`
  border-top: 1px solid #dadada;
  display: flex;
  padding: 20px 0;
  flex-direction: column;
  gap: 2px;

  h3 {
    font-weight: ${fonts.weight.bold};
    font-size: 12px;
    line-height: 20px;
    text-transform: uppercase;
    color: ${colors.gray};
  }
`;

export const Img = styled.img`
  border-radius: 4px;
  max-width: 690px;
  max-height: 690px;
`;

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: ${breakpoints.mobile}) {
    max-width: 50%;
  }
`;

export const Name = styled.h2`
  font-size: 32px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 32px;
  color: ${colors.black};
`;

export const PriceContainer = styled.div`
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${colors.border};
  display: flex;
  gap: 24px;
  justify-content: space-between;
  margin-top: 16px;
  padding: 8px;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: ${breakpoints.mobile}) {
    flex-direction: row;
  }
`;

export const UserLabel = styled(UUserLabel)`
  border-top: 1px solid #dadada;
  padding: 20px 0px;
`;
