import styled from 'styled-components';

import UUserLabel from 'components/UserLabel';
import {breakpoints} from 'styles';

export const ContributorList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ContributorContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 12px;

  @media (max-width: ${breakpoints.desktop}) {
    display: block;
    justify-content: start;
  }
`;

export const PositionIcon = styled.img`
  height: 40px;
  margin-right: 10px;
  width: 40px;
`;

export const RewardAmountContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: end;
  width: 100%;

  @media (max-width: ${breakpoints.desktop}) {
    justify-content: start;
    margin: 0px 90px;
  }
`;

export const UserLabelContainer = styled.div`
  display: flex;
`;

export const UserLabel = styled(UUserLabel)`
  flex-grow: 1;
`;
