import styled from 'styled-components';

import UUserLabel from 'components/UserLabel';
import {breakpoints, colors} from 'styles';

export const ButtonContainer = styled.div`
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${colors.border};
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin-top: 16px;
  padding: 8px;
  width: fit-content;
`;

export const Container = styled.div`
  padding: 24px 32px;
`;

export const CreatedDate = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
  margin-top: 16px;
`;

export const Description = styled.div`
  color: ${colors.secondary};
  margin-top: 16px;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
`;

export const Img = styled.img`
  border-radius: 4px;
`;

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoints.mobile}) {
    max-width: 50%;
  }
`;

export const Name = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-top: 4px;
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
  margin-top: 16px;
`;
