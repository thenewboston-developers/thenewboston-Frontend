import styled from 'styled-components';

import {breakpoints, colors, fonts} from 'styles';

export const Container = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  margin: 0 auto;
  max-width: 720px;
  padding: 20px 24px;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Heading = styled.div`
  color: ${colors.gray};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};

  & span {
    color: ${colors.black};
  }
`;

export const InvitationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
