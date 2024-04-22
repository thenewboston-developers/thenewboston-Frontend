import styled from 'styled-components';

import {colors} from 'styles';

export const ContributionCard = styled.div`
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 12px;
`;

export const ContributionCardHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 12px;
`;

export const ContributionCardBody = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
  padding: 8px 12px;
`;

export const ContributionCardItemContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const ContributionCardItemIcon = styled.div`
  align-items: center;
  background: ${colors.white};
  border: 2px solid ${colors.whiteHover};
  border-radius: 10px;
  display: flex;
  height: 40px;
  justify-content: center;
  margin-right: 10px;
  width: 40px;
`;
