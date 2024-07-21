import styled from 'styled-components';

import UUserLabel from 'components/UserLabel';
import {breakpoints, fonts} from 'styles';

export const ContributorList = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
`;

export const ContributorContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  padding: 8px 0;

  &:first-child {
    padding-top: 20px;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 20px;
  }

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
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  justify-content: end;
  width: 100%;

  @media (max-width: ${breakpoints.desktop}) {
    justify-content: start;
    margin: 0 90px;
  }
`;

export const UserLabelContainer = styled.div`
  display: flex;
`;

export const UserLabel = styled(UUserLabel)`
  flex-grow: 1;
`;
