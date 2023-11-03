import styled from 'styled-components';

import UUserLabel from 'components/UserLabel';
import {colors} from 'styles';

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

export const Description = styled.div`
  color: ${colors.secondary};
  margin-top: 16px;
`;

export const Img = styled.img`
  border-radius: 4px;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50%;
`;

export const Name = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-top: 4px;
`;

export const Right = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
`;

export const Top = styled.div`
  display: flex;
  gap: 24px;
`;

export const UserLabel = styled(UUserLabel)`
  margin-top: 16px;
`;
