import styled from 'styled-components';

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const ContributorList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ContributorListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 12px;
`;

export const PositionIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

export const ContributorName = styled.span`
  font-weight: bold;
  flex-grow: 1;
`;

export const ContributionAmount = styled.span`
  font-size: 1em;
`;

export const CoreLogo = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
`;
