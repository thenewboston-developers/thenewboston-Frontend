import styled from 'styled-components';

import {breakpoints, colors, fonts} from 'styles';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Container = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  margin: 0 auto;
  max-width: 720px;
  padding: 20px 24px;
  width: 100%;

  @media (max-width: ${breakpoints.mini}) {
    width: calc(100% - 48px);
  }
`;

export const Counter = styled.div`
  align-items: center;
  color: ${colors.palette.gray[600]};
  display: flex;
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
`;

export const FollowerContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid ${colors.border};
  display: flex;
  justify-content: space-between;
  padding: 8px 0;

  &:first-child {
    padding-top: 20px;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 20px;
  }
`;

export const Grid = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 24px 8px 1fr 16px auto;
  width: 100%;

  & > :nth-child(1) {
    grid-column: 1;
  }

  & > :nth-child(2) {
    grid-column: 3;
  }

  & > :nth-child(3) {
    grid-column: 5;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
`;

export const Heading = styled.div`
  color: ${colors.palette.gray[600]};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};

  & span {
    color: ${colors.black};
  }
`;

export const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 32px 16px;
`;

export const LoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;
