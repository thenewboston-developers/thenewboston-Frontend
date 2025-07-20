import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 720px;
  width: 100%;
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
